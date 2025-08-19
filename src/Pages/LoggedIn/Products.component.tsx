import { useContext, useState } from "react";
import { Car, Shield, Home, Plane, AlertTriangle, Info } from "lucide-react";
import styles from "./Products.module.css";
import { AppContext } from "../../Context/AppContext";

type ProductCategory = "general" | "life" | "investment";

interface Product {
  id: string;
  name: string;
  icon: React.ElementType;
  category: ProductCategory;
}

const Products = () => {
  const { isDarkMode } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<ProductCategory>("general");

  const products: Product[] = [
    { id: "1", name: "Third Party Insurance", icon: Car, category: "general" },
    { id: "2", name: "Comprehensive Insurance", icon: Car, category: "life" },
    { id: "3", name: "Home Insurance", icon: Home, category: "investment" },
    { id: "4", name: "Burglary Insurance", icon: Shield, category: "general" },
    { id: "5", name: "Travel Insurance", icon: Plane, category: "life" },
    { id: "6", name: "Personal Accident", icon: AlertTriangle, category: "investment" },
  ];

  const filteredProducts = products.filter(product => product.category === activeTab);

  const tabs = [
    { id: "general" as ProductCategory, label: "General Insurance" },
    { id: "life" as ProductCategory, label: "Life Insurance" },
    { id: "investment" as ProductCategory, label: "Investment" },
  ];

  return (
    <div className={`${styles.products} ${isDarkMode ? styles.productsDark : styles.productsLight}`}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <h1 className={styles.title}>Select Product</h1>
        <p className={styles.subtitle}>Choose the product you want</p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.tabActive : ""
              } ${isDarkMode ? styles.tabDark : styles.tabLight}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`${styles.productCard} ${
              isDarkMode ? styles.productCardDark : styles.productCardLight
            }`}
          >
            <div className={styles.productIcon}>
              <product.icon size={32} />
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <button className={styles.infoButton}>
              <Info size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;