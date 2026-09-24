import numpy as np
import pandas as pd

np.random.seed(42)
n = 8000

age = np.random.randint(35, 65, n)                      # years
gender = np.random.choice([1, 2], n)                     # 1=female, 2=male
height = np.where(gender == 2,
                   np.random.normal(172, 7, n),
                   np.random.normal(161, 6, n)).round().astype(int)
weight = (height - 100 + np.random.normal(0, 8, n)).round(1)
weight = np.clip(weight, 40, 150)

ap_hi = (100 + (age - 35) * 0.6 + (weight - 65) * 0.3 + np.random.normal(0, 8, n)).round().astype(int)
ap_lo = (ap_hi * 0.65 + np.random.normal(0, 4, n)).round().astype(int)

cholesterol = np.random.choice([1, 2, 3], n, p=[0.65, 0.22, 0.13])
gluc = np.random.choice([1, 2, 3], n, p=[0.7, 0.18, 0.12])
smoke = np.random.choice([0, 1], n, p=[0.82, 0.18])
alco = np.random.choice([0, 1], n, p=[0.88, 0.12])
active = np.random.choice([0, 1], n, p=[0.2, 0.8])

# risk score drives the target so the model has something real to learn
risk = (
    0.035 * (age - 45)
    + 0.04 * (ap_hi - 120)
    + 0.5 * (cholesterol - 1)
    + 0.3 * (gluc - 1)
    + 0.4 * smoke
    + 0.02 * (weight - 70)
    - 0.5 * active
    + np.random.normal(0, 1.5, n)
)
cardio = (risk > np.median(risk)).astype(int)

df = pd.DataFrame({
    "age": age,
    "gender": gender,
    "height": height,
    "weight": weight,
    "ap_hi": ap_hi,
    "ap_lo": ap_lo,
    "cholesterol": cholesterol,
    "gluc": gluc,
    "smoke": smoke,
    "alco": alco,
    "active": active,
    "cardio": cardio,
})

# sprinkle a few missing values + outliers, like real-world data
miss_idx = np.random.choice(df.index, 40, replace=False)
df.loc[miss_idx, "height"] = np.nan
out_idx = np.random.choice(df.index, 15, replace=False)
df.loc[out_idx, "ap_hi"] = np.random.randint(220, 260, 15)

df.to_csv("data/cardio_data.csv", index=False)
print(df.shape)
print(df["cardio"].value_counts())
