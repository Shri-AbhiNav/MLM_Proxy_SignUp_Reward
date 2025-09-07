// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract NativeStaking is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    
    uint256 private totalStaked;
    uint256 private userCount;

    uint256 public constant REFERRAL_REWARD_PERCENT = 10;

    mapping(address => uint256) public stakedAmounts;
    mapping(address => bool) private registeredUsers;
    mapping(address => address) public referrerOf;

    event Staked(address indexed user, uint256 amount);
    event UserRegistered(address indexed user, address indexed referrer, uint256 stakeAmount);
    event ReferralReward(address indexed referrer, address indexed user, uint256 reward);

    constructor() {
        _disableInitializers();
    }

    function initialize(address _owner) external initializer {
        __ReentrancyGuard_init();
        __Ownable_init(_owner);
        __UUPSUpgradeable_init();

        registeredUsers[_owner] = true;
        userCount = 1;
    }

    modifier onlyRegistered(address user) {
        require(registeredUsers[user], "Not registered");
        _;
    }

    function signUp(address user, address referrer) external payable nonReentrant {
        uint256 stakeAmount = msg.value;
        require(!registeredUsers[user], "Already registered");
        require(stakeAmount > 0, "Invalid stake");
        require(referrer != user, "Self-referral not allowed");
        require(registeredUsers[referrer], "Referrer not registered");

        registeredUsers[user] = true;
        referrerOf[user] = referrer;
        userCount++;

        uint256 reward = (stakeAmount * REFERRAL_REWARD_PERCENT) / 100;
        if (reward > 0) {
            (bool sent, ) = payable(referrer).call{value: reward}("");
            if (sent) {
                emit ReferralReward(referrer, user, reward);
            }
        }

        uint256 netStake = stakeAmount - reward;
        _stake(user, netStake);

        emit UserRegistered(user, referrer, stakeAmount);
    }

    function _stake(address user, uint256 amount) internal {
        require(amount > 0, "Stake must be > 0");
        stakedAmounts[user] += amount;
        totalStaked += amount;
        emit Staked(user, amount);
    }

    function stake(address user) external payable onlyRegistered(user) nonReentrant {
        _stake(user, msg.value);
    }

    function transfer(address to, uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Invalid amount");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(to).transfer(amount);
    }

    function balanceOfContract() external view returns (uint256) {
        return address(this).balance;
    }

    function isUserExists(address user) external view returns (bool) {
        return registeredUsers[user];
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    uint256[50] private __gap;
}


// 0x6594718a2e6958EfE1d0F1ec143e95F9E989ac2D
// 0xdC26E72bA5484D8Cf19BE442Ebea7CF33c17e2A3