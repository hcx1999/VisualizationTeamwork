import pandas as pd

df = pd.read_csv ('csv/population2.csv')

print(df.T)

df.T.to_csv('csv/population2.csv')