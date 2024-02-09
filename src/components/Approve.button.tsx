import { tokenAbi } from '@/abi';
import { Alert, AlertColor, Button, Snackbar } from '@mui/material';
import { use, useEffect, useState } from 'react';
import { Address } from 'viem';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

export function ApproveButton({
  takerAddress,
  onApproved,
  spenderAddress,
  sellTokenAddress,
  requiredAllowance,
  text,
}: {
  takerAddress: Address;
  spenderAddress: Address;
  onApproved: () => void;
  sellTokenAddress: Address;
  requiredAllowance: BigInt;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  // 1. Read from ERC20 contract. Does spender (0x Exchange Proxy) have an allowance?
  const { data: allowance, refetch } = useReadContract({
    address: sellTokenAddress,
    abi: tokenAbi,
    functionName: 'allowance',
    args: [takerAddress, spenderAddress],
  });

  useEffect(() => {
    if (allowance && allowance >= requiredAllowance) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [allowance, onApproved, requiredAllowance]);

  const {
    writeContract,
    error: writeContractError,
    data: txHash,
  } = useWriteContract();

  const {
    isLoading: isApproving,
    isSuccess: isApprovedData,
    isError: waitForTxErrorHappened,
    error: waitForTxError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isApprovedData) {
      setOpen(true);
      setSeverity('success');
      setMessage('Approved');
      refetch();
    }
    if (waitForTxErrorHappened) {
      setOpen(true);
      setSeverity('error');
      setMessage((waitForTxError as any)?.shortMessage || 'Error approving');
    }

    if (writeContractError) {
      setOpen(true);
      setSeverity('error');
      setMessage((writeContractError as any).shortMessage || 'Error approving');
    }
  }, [
    isApproved,
    isApprovedData,
    onApproved,
    refetch,
    waitForTxError,
    waitForTxErrorHappened,
    writeContractError,
  ]);

  const handleApproval = async () => {
    writeContract({
      abi: tokenAbi,
      functionName: 'approve',
      args: [spenderAddress, requiredAllowance],
      address: sellTokenAddress,
    });
  };

  const handleTransaction = async () => {
    if (isApproved) {
      onApproved();
    } else {
      handleApproval();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          borderRadius: '15px',
          backgroundColor: '#383838',
        }}
        disabled={isApproving}
        onClick={handleTransaction}
      >
        {text}
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity as AlertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
