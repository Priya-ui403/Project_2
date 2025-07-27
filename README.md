# Credit Card Fraud Detection using Machine Learning
 # 🔍Project Overview
Credit card fraud is a growing issue in financial systems around the world. This project aims to detect fraudulent transactions using machine learning techniques, with a focus on imbalanced classification problems and performance optimization.

I built this project to enhance my skills in data preprocessing, model building, evaluation, and visualization.

# 📌 Objectives
* Analyze and preprocess real-world credit card transaction data
* Handle imbalanced datasets using sampling techniques
* Train multiple machine learning models and compare performance
* Evaluate metrics beyond accuracy (precision, recall, F1-score, ROC-AUC)
* Visualize fraud patterns and model performance
# 🗃️ Dataset
The dataset is sourced from Kaggle: Credit Card Fraud Detection Dataset

* Contains 284,807 transactions
* 492 fraudulent transactions
* Features: anonymized using PCA (V1 to V28), Time, Amount, and Class
# ⚙️ Technologies Used
* Python
* Jupyter Notebook
* NumPy, Pandas
* Matplotlib, Seaborn
* Scikit-learn
* Imbalanced-learn
* XGBoost (optional)
* Streamlit (optional deployment)
# 📈 Model Pipeline
* Data Preprocessing
* Feature scaling
* Handling imbalanced data (SMOTE / Under-sampling)
* Model Training
* Logistic Regression
* Decision Tree
* Random Forest
* XGBoost
* Evaluation
* Confusion Matrix
* Precision, Recall, F1-score
* ROC-AUC Curve
# 📊 Results
* Model	Precision	Recall	F1-Score	ROC-AUC
* Logistic Regression	0.91	0.63	0.75	0.96
* Random Forest	0.98	0.81	0.89	0.99
* XGBoost	0.99	0.84	0.91	0.99
* These values are just examples. Replace them with your actual results.

# 📌 Key Takeaways
* Accuracy alone is not sufficient for imbalanced datasets.
* Precision-Recall and ROC-AUC are more reliable for fraud detection.
* Random Forest and XGBoost perform best in this case.
# 🧠 Future Work
* Use deep learning methods (e.g., autoencoders, LSTM)
* Build a live fraud detection dashboard
* Deploy the model using Streamlit or Flask
