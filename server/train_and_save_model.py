# ============================
# Ensemble Model: SGD Logistic Regression + Naive Bayes
# Optimized for large datasets (10M rows) and low RAM
# WITH CLASS WEIGHTS for imbalanced data
# ============================

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import SGDClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import VotingClassifier
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
import joblib

# ----------------------------------
# 1. Load processed dataset
# ----------------------------------
df = pd.read_csv('data/ProcessedBig5_clean_8categories.csv')
print("📌 Loaded dataset:", df.shape)

# Features & labels
X = df[['O', 'C', 'E', 'A', 'N']].values
y = df['Job_Category'].values

# ----------------------------------
# 2. Encode labels
# ----------------------------------
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Print class distribution to verify imbalance
print("\n📊 Class Distribution:")
unique, counts = np.unique(y, return_counts=True)
for cls, count in zip(unique, counts):
    pct = (count / len(y)) * 100
    print(f"  {cls}: {count:,} ({pct:.2f}%)")

# ----------------------------------
# 3. Scale features
# ----------------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ----------------------------------
# 4. Train-test split with STRATIFICATION
# (maintains class ratios in both train and test sets)
# ----------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# ----------------------------------
# 5. Compute Class Weights for balancing
# ----------------------------------
# 'balanced' mode: n_samples / (n_classes * np.bincount(y))
class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y_train),
    y=y_train
)

# Convert to dictionary for SGDClassifier
class_weight_dict = {i: class_weights[i] for i in range(len(class_weights))}

print("\n⚖️ Class Weights (higher = more importance for rare classes):")
for i, weight in enumerate(class_weights):
    class_name = label_encoder.inverse_transform([i])[0]
    print(f"  {class_name}: {weight:.2f}")

# ----------------------------------
# 6. Initialize models with CLASS WEIGHTS
# ----------------------------------

log_reg = SGDClassifier(
    loss='log_loss',           # logistic regression
    max_iter=2000,
    n_jobs=-1,
    verbose=1,
    class_weight='balanced',   # 🚨 KEY FIX: Handles imbalanced classes automatically
    random_state=42,
    tol=1e-3,
    early_stopping=True,       # Stop early if no improvement
    validation_fraction=0.1,   # Use 10% of training data for validation
    n_iter_no_change=5         # Stop if no improvement for 5 epochs
)

# Naive Bayes doesn't support class_weight, but we keep it for ensemble diversity
# It will be influenced less by imbalance due to its probabilistic nature
naive_bayes = GaussianNB()

# ----------------------------------
# 7. Ensemble Model (Soft Voting)
# ----------------------------------
ensemble_model = VotingClassifier(
    estimators=[
        ('log_reg', log_reg),
        ('nb', naive_bayes)
    ],
    voting='soft',             # average probabilities
    weights=[2, 1]             # Give more weight to logistic regression (has class balancing)
)

# ----------------------------------
# 8. Train the Ensemble
# ----------------------------------
print("\n🚀 Training Ensemble Model with Class Weight Balancing...")
ensemble_model.fit(X_train, y_train)

# ----------------------------------
# 9. Evaluate with stratified sample
# ----------------------------------
# Use stratified sampling for evaluation to ensure all classes are represented
from sklearn.model_selection import StratifiedShuffleSplit

sss = StratifiedShuffleSplit(n_splits=1, test_size=0.1, random_state=42)
for test_idx, _ in sss.split(X_test, y_test):
    X_sample = X_test[test_idx]
    y_sample = y_test[test_idx]
    
sample_acc = ensemble_model.score(X_sample, y_sample)
print(f"\n🎯 Stratified Test Accuracy (10% sample): {sample_acc:.4f}")

# Per-class accuracy
from sklearn.metrics import classification_report
y_pred = ensemble_model.predict(X_sample)
print("\n📋 Classification Report:")
print(classification_report(y_sample, y_pred, target_names=label_encoder.classes_))

# ----------------------------------
# 10. Save model + scaler + label encoder
# ----------------------------------
joblib.dump(ensemble_model, 'career_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

print("\n💾 Saved files:")
print("  - career_model.pkl (ensemble model)")
print("  - scaler.pkl (StandardScaler)")
print("  - label_encoder.pkl (LabelEncoder)")
print("\n🟢 Training Complete with Class Balancing!")