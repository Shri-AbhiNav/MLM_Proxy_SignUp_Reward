import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/config/contract";

export const getContract = async () => {
  const { ethereum } = window as any;
  if (!ethereum) throw new Error("MetaMask not found!");

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};
