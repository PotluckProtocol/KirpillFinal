import * as React from 'react';
import styles from './mint.module.scss';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import kirpillGif from '../../assets/gif/kirpill.gif';
import foodGif from '../../assets/gif/food.gif';
import Image from 'next/image';
import { Alert, AlertColor, Button, Snackbar } from '@mui/material';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { minterAbi, nftAbi } from '@/abi';
import { kcalAddress, minterAddress, nftAddress } from '@/config';
import { useDebounce } from 'use-debounce';
import { parseEther } from 'viem';
import { ApproveButton } from './Approve.button';
import { useMediaQuery } from '@/utils/useMediaQuery';
const MintComponet = () => {
  const isSmall = useMediaQuery(800);

  const [number, setNumber] = useState(1);
  const { address, isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);
  const [addr, setAddr] = useState<string>();
  const [minted, setMinted] = useState<number>(0);
  const [maxMinted, setMaxMinted] = useState<number>(0);
  const [ftmPrice, setFtmPrice] = useState<number>(0);
  const [kcalPrice, setKcalPrice] = useState<number>(0);
  const [kcalPrice1, setKcalPrice1] = useState<number>(0);
  const [paidTokens, setPaidTokens] = useState<number>(0);
  const [gen, setGen] = useState<number>(0);
  const [totalKcalPrice, setTotalKcalPrice] = useState<number>(0);
  const [totalFtmPrice, setTotalFtmPrice] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const handleClose = () => {
    setOpen(false);
  };

  const { writeContract, data, error, isError } = useWriteContract();

  useEffect(() => {
    if (isError && error) {
      setOpen(true);
      setSeverity('error');
      setMessage((error as any).shortMessage);
    }
  }, [error, isError]);

  const {
    error: waitForTxError,
    isError: waitForTxErrorHappened,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  const [numberDebounced] = useDebounce(number, 300);

  useEffect(() => {
    if (numberDebounced) {
      setTotalFtmPrice((Number(numberDebounced) * ftmPrice) / 1e18);
      setTotalKcalPrice(kcalPrice / 1e18);
    }
  }, [ftmPrice, gen, kcalPrice, kcalPrice1, numberDebounced]);

  const {
    data: paidTokensData,
    isLoading: paidTokensLoading,
    isFetched: paidTokensFetched,
  } = useReadContract({
    abi: nftAbi,
    address: nftAddress,
    functionName: 'PAID_TOKENS',
  });

  const {
    data: maxTokensData,
    isLoading: maxTokensLoading,
    isFetched: maxTokensFetched,
  } = useReadContract({
    abi: nftAbi,
    address: nftAddress,
    functionName: 'MAX_TOKENS',
  });

  const {
    data: mintedData,
    isLoading: mintedLoading,
    isFetched: mintedFetched,
    refetch: refetchMinted,
  } = useReadContract({
    abi: nftAbi,
    address: nftAddress,
    functionName: 'minted',
  });

  const {
    data: ftmPriceData,
    isLoading: ftmPriceLoading,
    isFetched: ftmPriceFetched,
  } = useReadContract({
    abi: minterAbi,
    address: minterAddress,
    functionName: 'ftmGen0Price',
  });

  const {
    data: kcalPriceData,
    isLoading: kcalPriceLoading,
    isFetched: kcalPriceFetched,
    refetch: refetchKcalPrice,
  } = useReadContract({
    abi: minterAbi,
    address: minterAddress,
    functionName: 'calculateKcalTotalCost',
    args: [numberDebounced],
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      setSeverity('success');
      setMessage('Transaction is successful');
      refetchMinted();
      refetchKcalPrice();
    }
    if (waitForTxErrorHappened) {
      setOpen(true);
      setSeverity('error');
      setMessage((waitForTxError as any)?.shortMessage);
    }
  }, [
    isSuccess,
    refetchKcalPrice,
    refetchMinted,
    waitForTxError,
    waitForTxErrorHappened,
  ]);

  useEffect(() => {
    if (minted && paidTokens && minted > paidTokens) {
      setGen(1);
    } else {
      setGen(0);
    }
  }, [
    minted,
    paidTokens,
    paidTokensData,
    paidTokensFetched,
    paidTokensLoading,
  ]);

  useEffect(() => {
    if (!paidTokensLoading && paidTokensFetched && paidTokensData) {
      setPaidTokens(Number(paidTokensData));
    }
  }, [paidTokensData, paidTokensFetched, paidTokensLoading]);

  useEffect(() => {
    if (!ftmPriceLoading && ftmPriceFetched && ftmPriceData) {
      setFtmPrice(Number(ftmPriceData));
    }
  }, [ftmPriceData, ftmPriceFetched, ftmPriceLoading]);

  useEffect(() => {
    if (!kcalPriceLoading && kcalPriceFetched && kcalPriceData) {
      setKcalPrice(Number(kcalPriceData));
    }
  }, [kcalPriceData, kcalPriceFetched, kcalPriceLoading]);

  useEffect(() => {
    if (!maxTokensLoading && maxTokensFetched && maxTokensData) {
      setMaxMinted(Number(maxTokensData));
    }
  }, [maxTokensData, maxTokensFetched, maxTokensLoading]);

  useEffect(() => {
    if (!mintedLoading && mintedFetched && mintedData) {
      setMinted(Number(mintedData));
    }
  }, [mintedData, mintedFetched, mintedLoading]);

  useEffect(() => {
    setConnectionStat(isConnected);
    setAddr(address);
  }, [address, isConnected]);

  const handleInput = (event: any) => {
    setNumber(event.target.value);
  };

  const handleMintFtm = async () => {
    if (addr) {
      writeContract({
        abi: minterAbi,
        address: minterAddress,
        functionName: 'mintWithFtm',
        args: [number],
        value: parseEther(totalFtmPrice.toString()),
      });
    }
  };

  const handleMintKcal = () => {
    if (addr) {
      writeContract({
        abi: minterAbi,
        address: minterAddress,
        functionName: 'mintWithKcal',
        args: [number],
      });
    }
  };

  return (
    <div className={styles['minter-wrapper']}>
      {connectionStat && (
        <div
          className={styles['row']}
          style={{
            justifyContent: 'center',
            backgroundColor: '#383838',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            marginBottom: '20px',
          }}
        >
          <div className={styles['column']}>
            <w3m-button />
          </div>
        </div>
      )}
      <div
        className={styles['row']}
        style={{
          padding: '20px',
        }}
      >
        <div className={styles['column']}>
          <Image
            style={{ borderRadius: '15px' }}
            src={foodGif}
            height={150}
            priority
            alt={''}
          />
        </div>
        <div className={styles['column']}>
          <p
            style={{
              margin: '0',
              fontFamily: 'Arial, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#383838',
            }}
          >
            {gen === 0 ? 'GEN 0' : 'GEN 1'}
          </p>
          <p
            style={{
              margin: '0',
              fontFamily: 'Arial, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#383838',
            }}
          >
            MINTED {minted}/{String(maxMinted)}
          </p>
          {connectionStat && (
            <TextField
              id="input"
              type="number"
              label="Number of NFTs"
              variant="outlined"
              style={{ margin: '10px 0', width: '45%' }}
              onChange={handleInput}
              value={number}
              InputLabelProps={{
                shrink: true,
                style: { color: '#383838', fontWeight: 'bold' },
              }}
              InputProps={{
                style: {
                  textAlign: 'center',
                  color: '#383838',
                  fontSize: '20px',
                  fontWeight: 'bold',
                },
              }}
            />
          )}

          <div
            className={styles['row']}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              className={styles['column']}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {connectionStat ? (
                <>
                  {gen === 0 && (
                    <>
                      <div>
                        {connectionStat ? (
                          <Button
                            onClick={handleMintFtm}
                            variant="contained"
                            style={{
                              borderRadius: '15px',
                              backgroundColor: '#383838',
                            }}
                          >
                            {totalFtmPrice
                              ? `MINT FOR ${totalFtmPrice} FTM`
                              : 'MINT FOR FTM'}
                          </Button>
                        ) : (
                          <w3m-button />
                        )}
                      </div>
                      <p
                        style={{
                          margin: '0',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: '#383838',
                        }}
                      >
                        OR
                      </p>
                    </>
                  )}
                  <div>
                    {connectionStat ? (
                      <ApproveButton
                        requiredAllowance={BigInt(kcalPrice)}
                        spenderAddress={minterAddress}
                        sellTokenAddress={kcalAddress}
                        takerAddress={addr as `0x${string}`}
                        onApproved={handleMintKcal}
                        text={
                          totalKcalPrice
                            ? `MINT FOR ${totalKcalPrice} $KCAL`
                            : 'MINT FOR $KCAL'
                        }
                      />
                    ) : (
                      <w3m-button />
                    )}
                  </div>
                </>
              ) : (
                <w3m-button size="md" />
              )}
            </div>
          </div>
        </div>

        <div className={styles['column']}>
          <Image
            style={{ borderRadius: '15px' }}
            src={kirpillGif}
            height={150}
            priority
            alt={''}
          />
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity as AlertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MintComponet;
