import { getWalletService, createWalletService, updateBalanceWalletService} from "../services/walletService.js";

export async function getWallet(req, res, next) {

  try {
    const wallet = await getWalletService(req.user.id);

    res.json(wallet);

  } catch (err) {
    next(err);
  }
};

export async function createWallet(req, res, next) {
  try {
    const wallet = await createWalletService(req.user.id);
    res.status(201).json(wallet);
  } catch (err) {
    next(err);
  }
}

export async function updateWalletBalance(req, res, next) {
  try {
    const { walletId, newBalance } = req.body;

    // service giving back updated wallet
    const updatedWallet = await updateBalanceWalletService(
      walletId,
      req.user.id,
      newBalance
    );

    res.status(200).json(updatedWallet);
  } catch (err) {
    next(err);
  }
}