import { useContext, useEffect, useState } from "react";
import { FolderHeart, FileText, ChevronRight } from "lucide-react";
import styles from "./Dashboard.module.css";
import { AppContext } from "../../Context/AppContext";
import PrimaryButton from "../../components/button/PrimaryButton.component";

type Transaction = {
  policyNumber: string;
  productName: string;
  premiumPaid: string;
  transactionDate: string;
};

type UserDetails = {
  firstName?: string;
  fullName?: string;
};

const Dashboard = () => {
  const { isDarkMode } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState<UserDetails>({});

  const mockTransactions: Transaction[] = [
    {
      policyNumber: "12001903001",
      productName: "Motor Insurance",
      premiumPaid: "₦50,000",
      transactionDate: "12/20/2024",
    },
    {
      policyNumber: "001039837RR",
      productName: "Group Personal Accident",
      premiumPaid: "₦50,000",
      transactionDate: "12/20/2024",
    },
    {
      policyNumber: "001039837RR",
      productName: "E-Term Assurance",
      premiumPaid: "₦50,000",
      transactionDate: "12/20/2024",
    },
    {
      policyNumber: "001039837RR",
      productName: "Motor Insurance",
      premiumPaid: "₦50,000",
      transactionDate: "12/20/2024",
    },
    {
      policyNumber: "001039837RR",
      productName: "Motor Insurance",
      premiumPaid: "₦50,000",
      transactionDate: "12/20/2024",
    },
  ];

  useEffect(() => {
    const details = sessionStorage.getItem("details");
    if (details) {
      const parsedDetails = JSON.parse(details);
      setUserDetails(parsedDetails);
    }
  }, []);

  const getFirstName = () => {
    if (userDetails.firstName) {
      return userDetails.firstName;
    }
    if (userDetails.fullName) {
      return userDetails.fullName.split(" ")[0];
    }
    return "User";
  };

  return (
    <div className={`${styles.dashboard} ${isDarkMode ? styles.dashboardDark : styles.dashboardLight}`}>
      {/* Mobile Greeting */}
      <div className={styles.mobileGreeting}>
        <h1 className={styles.greeting}>Hi {getFirstName()},</h1>
        <p className={styles.subtitle}>Manage your policies, see due dates, review history</p>
      </div>

      {/* Overview Cards */}
      <div className={styles.overviewCards}>
        {/* My Policies Card */}
        <div className={`${styles.overviewCard} ${isDarkMode ? styles.overviewCardDark : styles.overviewCardLight}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FolderHeart size={20} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>My Policies</h3>
              <span className={styles.cardCount}>5</span>
            </div>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.seeAllBtn}>See All</button>
            <button className={styles.buyNowBtn}>
              Buy Now <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Claims History Card */}
        <div className={`${styles.overviewCard} ${isDarkMode ? styles.overviewCardDark : styles.overviewCardLight}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FileText size={20} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>Claims History</h3>
              <span className={styles.cardCount}>0</span>
            </div>
          </div>
          <div className={styles.cardActions}>
            <PrimaryButton
              id="start-here-btn"
              label="Start Here"
              isDisabled={false}
              hasIcon={false}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`${styles.transactionsSection} ${isDarkMode ? styles.transactionsSectionDark : styles.transactionsSectionLight}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Transactions</h2>
        </div>

        {/* Desktop Table */}
        <div className={styles.desktopTable}>
          <table className={styles.transactionsTable}>
            <thead>
              <tr>
                <th>Policy Number</th>
                <th>Product Name</th>
                <th>Premium Paid</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.policyNumber}</td>
                  <td>{transaction.productName}</td>
                  <td>{transaction.premiumPaid}</td>
                  <td>{transaction.transactionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className={styles.mobileList}>
          {mockTransactions.map((transaction, index) => (
            <div key={index} className={`${styles.transactionItem} ${isDarkMode ? styles.transactionItemDark : styles.transactionItemLight}`}>
              <div className={styles.transactionHeader}>
                <span className={styles.policyNumber}>{transaction.policyNumber}</span>
              </div>
              <div className={styles.transactionDetails}>
                <span className={styles.productName}>{transaction.productName}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.seeMoreContainer}>
          <button className={styles.seeMoreBtn}>See More</button>
        </div>
      </div>

      {/* Promotional Card */}
      <div className={`${styles.promoCard} ${isDarkMode ? styles.promoCardDark : styles.promoCardLight}`}>
        <div className={styles.promoContent}>
          <h3 className={styles.promoTitle}>Term Protection Insurance</h3>
          <p className={styles.promoDescription}>
            {window.innerWidth < 768 
              ? "Access bank customers can get insurance from us at cheaper rates with our current bancassurance promotion running from July 24 - Sept 24 2024"
              : "FREE life cover! Scope of Cover: Demise, absolutely FREE! (No deduction is made as risk premium on your contribution Additional cover: permanent disability, critical illness and medical expenses as a result of accident (at a cost)"
            }
          </p>
          <div className={styles.promoAction}>
            <button className={styles.getProductBtn}>Get Product</button>
          </div>
        </div>
        <div className={styles.promoImage}>
          <img 
            src="https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Family protection" 
            className={styles.promoImg}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;