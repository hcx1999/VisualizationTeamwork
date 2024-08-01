# -*- coding: utf-8 -*-
"""
Created on Sat Apr  6 19:04:36 2024

@author: Znn
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.svm import SVR  # 导入支持向量回归类
from math import sqrt

# 读取excel数据
data = pd.read_excel("D:\\毕业论文\\实验数据\\数据汇总.xlsx")

# 定义预测目标和特征
y = data['电阻率']
features = ['水灰比', '砂率', '养护龄期', '温度', '含水率']
X = data[features]

# 将数据分割成训练和验证数据集
train_X, val_X, train_y, val_y = train_test_split(X, y, test_size=0.2,random_state=1)

# 创建支持向量机回归模型
model = SVR(kernel='linear')

# 训练模型
model.fit(train_X, train_y)

# 对训练数据进行预测
train_predictions = model.predict(train_X)
train_mae = mean_absolute_error(train_predictions, train_y)
train_mse = mean_squared_error(train_predictions, train_y)
train_rmse = sqrt(train_mse)
train_r2 = r2_score(train_predictions, train_y)
print("训练数据的MAE: {:,.3f}".format(train_mae))
print("训练数据的MSE: {:,.3f}".format(train_mse))
print("训练数据的RMSE: {:,.3f}".format(train_rmse))
print("训练数据的R2: {:.3f}".format(train_r2))

# 对测试数据进行预测
val_predictions = model.predict(val_X)
val_mae = mean_absolute_error(val_predictions, val_y)
val_mse = mean_squared_error(val_predictions, val_y)
val_rmse = sqrt(val_mse)
val_r2 = r2_score(val_predictions, val_y)
print("测试数据的MAE: {:,.3f}".format(val_mae))
print("测试数据的MSE: {:,.3f}".format(val_mse))
print("测试数据的RMSE: {:,.3f}".format(val_rmse))
print("测试数据的R2: {:.3f}".format(val_r2))

# 将测试集预测结果添加到测试数据DataFrame中
val_data_with_predictions = val_X.copy()
val_data_with_predictions['实际电阻率'] = val_y
val_data_with_predictions['预测电阻率'] = val_predictions

# 如果需要，可以选择保存测试集预测结果到Excel文件
val_data_with_predictions.to_excel("D:\\毕业论文\\实验数据\\测试集预测结果.xlsx", index=False)