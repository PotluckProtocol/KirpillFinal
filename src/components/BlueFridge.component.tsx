'use client';
import bluefridge from '../../assets/png/bluefridge.png';
import unstaked from '../../assets/png/unstaked.png';
import staked from '../../assets/png/staked.png';
import claim from '../../assets/png/claim.png';
import Image from 'next/image';
import styles from './blueFridge.module.scss';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { fridgeAddress, nftAddress } from '@/config';
import { fridgeAbi, nftAbi } from '@/abi';
import { formatUnits, parseEther, parseUnits } from 'viem';
import {
  Alert,
  AlertColor,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';

const BlueFridgeComponent = () => {
  const [blueTokensList, setBlueTokensList] = useState<number[]>([]);

  const [tokenIds, setTokenIds] = useState<number[]>();
  const [rewardsMapping, setRewardsMapping] =
    useState<Record<number, number>>();
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
    abi: fridgeAbi,
    address: fridgeAddress,
    functionName: 'getTokensByOwner',
    args: [addr],
  });

  const nftContract = {
    address: nftAddress,
    abi: nftAbi,
  } as const;

  const fridgeContract = {
    address: fridgeAddress,
    abi: fridgeAbi,
  } as const;

  const contractCalls = tokenIds?.map((tokenId) => ({
    ...nftContract,
    functionName: 'tokenURI',
    args: [tokenId],
  }));

  const fridgeContractCall = blueTokensList?.map((tokenId) => ({
    ...fridgeContract,
    functionName: 'calculateRewards',
    args: [tokenId],
  }));

  const {
    data: rewardsData,
    isLoading: rewardsLoading,
    isFetched: rewardsFetched,
    refetch: refetchRewards,
  } = useReadContracts({
    contracts: fridgeContractCall as any,
    batchSize: 5,
  });

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
    if (rewardsData && rewardsFetched && !rewardsLoading) {
      const newRewardsMapping = {} as Record<number, number>;

      rewardsData.forEach((data, index) => {
        const tokenId = blueTokensList && blueTokensList[index];
        newRewardsMapping[tokenId as number] = data.result as number;
      });

      setRewardsMapping(newRewardsMapping);
    }
  }, [rewardsData, rewardsFetched, rewardsLoading, blueTokensList]);

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
    if (isSuccess) {
      setOpen(true);
      setSeverity('success');
      setMessage('Transaction is successful');
      refetchTokenIds();
      refetchTokenData();
      refetchRewards();
      handleStakedBlue();
    }
    if (waitForTxErrorHappened) {
      setOpen(true);
      setSeverity('error');
      setMessage((waitForTxError as any)?.shortMessage);
    }
  }, [
    isSuccess,
    refetchRewards,
    refetchTokenData,
    refetchTokenIds,
    waitForTxError,
    waitForTxErrorHappened,
  ]);

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

  const handleClaim = () => {
    if (addr && blueTokensList.length > 0) {
      writeContract({
        abi: fridgeAbi,
        address: fridgeAddress,
        functionName: 'claimManyFromFridgeAndPack',
        args: [blueTokensList, false],
        value: parseEther((blueTokensList.length * 2.5).toString()),
      });
    }
  };

  const handleWithdraw = () => {
    if (addr && blueTokensList.length > 0) {
      writeContract({
        abi: fridgeAbi,
        address: fridgeAddress,
        functionName: 'claimManyFromFridgeAndPack',
        args: [blueTokensList, true],
        value: parseEther((blueTokensList.length * 2.5).toString()),
      });
    }
  };

  const handleSelectAllBlue = () => {
    const allTokenIds = tokenURIsMapping
      ? Object.keys(tokenURIsMapping).map(Number)
      : [];
    setBlueTokensList(allTokenIds);
  };

  const handleStakedBlue = () => {
    setBlueTokensList([]);
    setRewardsMapping({});
  };

  const handleSelectTokenIdBlue = (token_id: number) => {
    if (blueTokensList?.includes(token_id)) {
      rewardsMapping && delete rewardsMapping[token_id];
      setRewardsMapping(rewardsMapping);
      setBlueTokensList(blueTokensList.filter((id) => id !== token_id));
    } else {
      if (blueTokensList) setBlueTokensList([...blueTokensList, token_id]);
    }
  };

  return (
    <div className={styles['blue-fridge']}>
      <Image src={bluefridge} width={600} priority alt={''} />
      <div className={styles['staked']}>
        <Button
          onClick={handleSelectAllBlue}
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
                    onClick={() => handleSelectTokenIdBlue(Number(tokenId))}
                    className={
                      blueTokensList.includes(Number(tokenId))
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

      {isPending ? (
        <CircularProgress
          className={styles['claim']}
          style={{ justifyItems: 'center' }}
        />
      ) : (
        <button className={styles['claim']} onClick={handleClaim}>
          <Image src={claim} height={40} priority alt={''} />
        </button>
      )}
      <div className={styles['stake-all']} >
        <Button
          onClick={handleStakedBlue}
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

      <div className={styles['rigth-text-blue']}>
        <p>
          {blueTokensList.length} NFTs selected
          <br />
          {rewardsMapping &&
            Object.entries(rewardsMapping).map(([tokenId, reward], index) => (
              <div key={index}>
                <p>
                  {reward && formatUnits(BigInt(reward), 18).toString()} $KCAL
                  <br />
                </p>
              </div>
            ))}
        </p>
      </div>

      {
        isPending ? (
          <CircularProgress
            className={styles['withdraw']}
            style={{ justifyItems: 'center' }}
          />
        ) : (
          <div className={styles["withdraw"]} >
            <Button
              onClick={handleWithdraw}
              variant="contained"
              style={{
                borderRadius: '15px',
                backgroundColor: '#383838',
                color: 'red',
                fontWeight: 'bold',
                left: '60%',
                justifyContent: 'center',
                justifyItems: 'center',
                margin: 'auto',
              }}
            >
              WITHDRAW
            </Button>
          </div>
        )
      }

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
    </div >
  );
};

export default BlueFridgeComponent;
