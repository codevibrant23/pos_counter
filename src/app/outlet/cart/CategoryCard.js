const CategoryCard = ({ categoriesData }) => {
  return (
    <div>
      {categoriesData.map((category, index) => {
        return (
          <div className={styles.categoryCard} key={index}>
            <div className="text-lg font-medium">{category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCard;
