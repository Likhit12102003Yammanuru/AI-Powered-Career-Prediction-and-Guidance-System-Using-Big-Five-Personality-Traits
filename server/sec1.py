import pandas as pd

df = pd.read_csv("data/ProcessedBig5_clean_8categories.csv")

print(df.columns)      # shows column names only
print(df.head(10))     # shows first 10 entries
