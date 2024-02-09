import { minterAbi, nftAbi } from '@/abi';
import { config, minterAddress, nftAddress } from '@/config';
import type { NextApiRequest, NextApiResponse } from 'next';
import { readContract, readContracts } from '@wagmi/core';

type Data = {
  unrevealedTokenIds: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const unknownMintedCount = await readContract(config, {
    abi: nftAbi,
    address: nftAddress,
    functionName: 'unknownMinted',
  });
  let checkCount;
  const lastKnownId = 2000;
  const unrevealedTokenIds: number[] = [];

  if (Number(unknownMintedCount) > 0) {
    checkCount = await readContract(config, {
      abi: nftAbi,
      address: nftAddress,
      functionName: 'minted',
    });

    const batches = [];
    for (let i = lastKnownId; i < Number(checkCount); i += 50) {
      const batch = [];
      for (let j = i; j < i + 50 && j < Number(checkCount); j++) {
        batch.push({
          address: minterAddress,
          abi: minterAbi,
          functionName: 'tokenData',
          args: [j],
        });
      }
      batches.push(batch);
    }

    for (const batch of batches) {
      const results = await readContracts(config, { contracts: batch as any });
      if (results) {
        results.forEach((result, index) => {
          console.log(result);
          if (
            result &&
            result.status == 'success' &&
            Number((result.result as any[])[1]) === 0
          ) {
            unrevealedTokenIds.push(batch[index].args[0]);
          }
        });
      }
    }
  }

  res.status(200).json({ unrevealedTokenIds });
}
