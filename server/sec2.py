import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('data/ProcessedBig5_clean_8categories.csv')

# Check if the data follows the logic in jobDetails.js
print("Category distribution:")
print(df['Job_Category'].value_counts())

# Check average Big5 scores per category
print("\nAverage Big5 by category:")
print(df.groupby('Job_Category')[['O', 'C', 'E', 'A', 'N']].mean())

# Specifically check: Do "Practical / Routine / Operational" entries actually have LOW Openness?
practical = df[df['Job_Category'] == 'Practical / Routine / Operational']
print(f"\nPractical jobs - Openness stats: min={practical['O'].min()}, max={practical['O'].max()}, mean={practical['O'].mean()}")