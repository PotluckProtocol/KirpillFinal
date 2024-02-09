'use client';
import Image from 'next/image';
import styles from './redFridge.module.scss';
import { useEffect, useState } from 'react';

// Sample images, replace with your actual imports
import redfridge from '../../assets/png/redfridge.png';
import stake from '../../assets/png/stake.png';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { fridgeAbi, nftAbi } from '@/abi';
import { fridgeAddress, nftAddress } from '@/config';
import {
  Alert,
  AlertColor,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';

const RedFridgeComponent = () => {
  const [tokenIds, setTokenIds] = useState<number[]>();
  const [tokenURIsMapping, setTokenURIsMapping] =
    useState<Record<number, string>>();
  const [tokenMetadataMapping, setTokenMetadataMapping] =
    useState<Record<number, any>>();
  const { address, isConnected } = useAccount();
  const [connectionStat, setConnectionStat] = useState(false);
  const [addr, setAddr] = useState<string>();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: tokenIdsData,
    isLoading: tokenIdsLoading,
    isFetched: tokenIdsFetched,
    refetch: refetchTokenIds,
  } = useReadContract({
    abi: nftAbi,
    address: nftAddress,
    functionName: 'getTokensOf',
    args: [addr],
  });

  const nftContract = {
    address: nftAddress,
    abi: nftAbi,
  } as const;

  const contractCalls = tokenIds?.map((tokenId) => ({
    ...nftContract,
    functionName: 'tokenURI',
    args: [tokenId],
  }));

  const {
    data: tokenData,
    isLoading: tokenDataLoading,
    isFetched: tokenDataFetched,
    refetch: refetchTokenData,
  } = useReadContracts({
    contracts: contractCalls as any,
    batchSize: 5,
  });

  useEffect(() => {
    if (tokenData && tokenDataFetched && !tokenDataLoading) {
      const newTokenUrisMapping = {} as Record<number, string>;
      const newTokenMetadataMapping = {} as Record<number, any>;

      tokenData.forEach((data, index) => {
        const tokenId = tokenIds && tokenIds[index];
        const base64Encoded = data.result
          ? (data.result as string).split('base64,')[1]
          : null;

        if (!base64Encoded) {
          refetchTokenData();
          return;
        }

        try {
          const tokenURIObj = JSON.parse(
            Buffer.from(base64Encoded, 'base64').toString('utf-8')
          );

          if (tokenURIObj.image) {
            newTokenUrisMapping[tokenId as number] = tokenURIObj.image;
          }

          const { image, ...metadataWithoutImage } = tokenURIObj;
          newTokenMetadataMapping[tokenId as number] = metadataWithoutImage;
        } catch (error) {
          console.error('Error parsing tokenURI for tokenId:', tokenId, error);
        }
      });

      setTokenURIsMapping(newTokenUrisMapping);
      setTokenMetadataMapping(newTokenMetadataMapping);
    }
  }, [
    refetchTokenData,
    tokenData,
    tokenDataFetched,
    tokenDataLoading,
    tokenIds,
  ]);

  useEffect(() => {
    if (tokenIdsData && tokenIdsFetched && !tokenIdsLoading) {
      setTokenIds(Array.from(tokenIdsData as ArrayLike<number>) as number[]);
    }
  }, [tokenIdsData, tokenIdsFetched, tokenIdsLoading]);

  useEffect(() => {
    setConnectionStat(isConnected);
    setAddr(address);
  }, [address, isConnected]);

  const [redTokensList, setRedTokensList] = useState<number[]>([]);

  const handleUnstakeAllRed = () => {
    setRedTokensList([]);
  };

  const handleSelectAllRed = () => {
    const allTokenIds = tokenURIsMapping
      ? Object.keys(tokenURIsMapping).map(Number)
      : [];
    setRedTokensList(allTokenIds);
  };

  const handleSelectTokenIdRed = (tokenId: number) => {
    if (redTokensList.includes(tokenId)) {
      setRedTokensList(redTokensList.filter((id) => id !== tokenId));
    } else {
      setRedTokensList([...redTokensList, tokenId]);
    }
  };

  const {
    data: txHash,
    error: stakeError,
    isPending,
    isError,
    writeContract,
  } = useWriteContract();

  const {
    error: waitForTxError,
    isError: waitForTxErrorHappened,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isError && stakeError) {
      setOpen(true);
      setSeverity('error');
      setMessage((stakeError as any).shortMessage);
    }
  }, [stakeError, isError]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
      setSeverity('success');
      setMessage('Transaction is successful');
      refetchTokenIds();
    }
    if (waitForTxErrorHappened) {
      setOpen(true);
      setSeverity('error');
      setMessage((waitForTxError as any)?.shortMessage);
    }
  }, [isSuccess, refetchTokenIds, waitForTxError, waitForTxErrorHappened]);

  const handleStakeRed = () => {
    if (addr && redTokensList.length > 0) {
      writeContract({
        abi: fridgeAbi,
        address: fridgeAddress,
        functionName: 'addManyToFridgeAndPack',
        args: [addr, redTokensList],
      });
    }
  };

  return (
    <div className={styles['red-fridge']}>
      <Image src={redfridge} height={600} priority alt="" />
      <div className={styles['unstaked']} >
        <Button
          onClick={handleSelectAllRed}
          variant="contained"
          style={{
            borderRadius: '15px',
            backgroundColor: '#383838',
            color: 'red',
            fontWeight: 'bold',
            justifyContent: 'center',
            justifyItems: 'center',
            margin: 'auto',
          }}
        >
          SELECT ALL
        </Button>
      </div>
      <p className={styles['title']}>SELECT TOKEN IDS</p>
      <div className={styles['left-content']}>
        <div className={styles['scrollable-content']}>
          {tokenURIsMapping &&
            Object.entries(tokenURIsMapping).map(
              ([tokenId, imageUrl], index) => (
                <div key={index} className={styles['grid-item']}>
                  <div
                    onClick={() => handleSelectTokenIdRed(Number(tokenId))}
                    className={
                      redTokensList.includes(Number(tokenId))
                        ? styles['token-border']
                        : ''
                    }
                  >
                    <Image
                      src={imageUrl}
                      height={55}
                      width={65}
                      priority
                      alt=""
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className={styles['stake-all']} >
        <Button
          onClick={handleUnstakeAllRed}
          variant="contained"
          style={{
            borderRadius: '15px',
            backgroundColor: '#383838',
            color: 'red',
            fontWeight: 'bold',
            justifyContent: 'center',
            justifyItems: 'center',
            margin: 'auto',
          }}
        >
          DESELECT ALL
        </Button>
      </div>
      {connectionStat ? (
        isPending ? (
          <CircularProgress
            className={styles['stake']}
            style={{ justifyItems: 'center' }}
          />
        ) : (
          <button className={styles['stake']} onClick={handleStakeRed}>
            <Image src={stake} height={50} priority alt="" />
          </button>
        )
      ) : (
        <button className={styles['stake']}>
          <w3m-button size="md" balance="hide" />
        </button>
      )}
      <div className={styles['center-container']}>
        <div className={styles['right-text']}>
          {redTokensList.length > 0 && (
            <p>
              {redTokensList
                .map((tokenId, index) => {
                  const metadata =
                    tokenMetadataMapping && tokenMetadataMapping[tokenId];
                  const attributes = metadata?.attributes;
                  const alphaScoreAttribute = attributes?.find(
                    (attribute: any) => attribute.trait_type === 'Alpha Score'
                  );
                  const alphaScore = alphaScoreAttribute
                    ? alphaScoreAttribute.value
                    : null;
                  return alphaScore
                    ? `${metadata?.name}-${alphaScore}`
                    : metadata?.name || `#${tokenId}`;
                })
                .join(', ')}
            </p>
          )}
        </div>
      </div>

      {connectionStat ? (
        <div className={styles['right-button']}>
          <w3m-button size="md" balance="hide" />
        </div>
      ) : null}
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

export default RedFridgeComponent;
