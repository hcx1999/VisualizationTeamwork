
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.svm import SVR  # 导入支持向量回归类
from math import sqrt

def SVRLearning(toYear):

    # 读取excel数据
    data = pd.read_csv("csv/output.csv")
    # print(data)
    # 定义预测目标和特征
    featuresY =  ['Age population, age 00, female, interpolated', 
            'Age population, age 00, male, interpolated', 
            'Fertility rate, total (births per woman)', 
            'Mortality rate, adult, male (per 1,000 male adults)', 
            'Mortality rate, adult, female (per 1,000 female adults)', 
            'Life expectancy at birth, male (years)', 
            'Life expectancy at birth, female (years)',
            'Population', 
            'Male', 
            'Female', 
            'City', 
            'Countryside', 
            'BirthRate', 
            'DeathRate', 
            'GrowthRate']
    testsY = [i for i in featuresY]
    y = data[featuresY]
    featuresX = ['Year']
    X = data[featuresX]
    # print(X)
    # print(y)

    # 将数据分割成训练和验证数据集
    train_X, val_X, train_y, val_y = train_test_split(X, y, test_size=0.2, random_state=1)

    # 创建模型
    # model = MultiOutputRegressor(GradientBoostingRegressor(random_state=1))
    # model = MultiOutputRegressor(DecisionTreeRegressor(random_state=1))
    model = MultiOutputRegressor(SVR(kernel='linear'))

    # 训练模型
    model.fit(train_X, train_y)

    # 对训练数据进行预测
    # train_predictions = model.predict(train_X)
    # train_mae = mean_absolute_error(train_predictions, train_y)
    # train_mse = mean_squared_error(train_predictions, train_y)
    # train_rmse = sqrt(train_mse)
    # train_r2 = r2_score(train_predictions, train_y)
    # print("训练数据的MAE: {:,.3f}".format(train_mae))
    # print("训练数据的MSE: {:,.3f}".format(train_mse))
    # print("训练数据的RMSE: {:,.3f}".format(train_rmse))
    # print("训练数据的R2: {:.3f}".format(train_r2))

    val_X = pd.DataFrame()
    val_X['Year'] = [year for year in range(2022, toYear)]
    # print(val_X)

    # 对测试数据进行预测
    val_predictions = model.predict(val_X)
    # val_mae = mean_absolute_error(val_predictions, val_y)
    # val_mse = mean_squared_error(val_predictions, val_y)
    # val_rmse = sqrt(val_mse)
    # val_r2 = r2_score(val_predictions, val_y)
    # print("测试数据的MAE: {:,.3f}".format(val_mae))
    # print("测试数据的MSE: {:,.3f}".format(val_mse))
    # print("测试数据的RMSE: {:,.3f}".format(val_rmse))
    # print("测试数据的R2: {:.3f}".format(val_r2))

    # 将测试集预测结果添加到测试数据DataFrame中
    val_data_with_predictions = val_X.copy()
    # val_data_with_predictions[featuresY] = val_y
    val_data_with_predictions[testsY] = val_predictions
    # print(type(val_data_with_predictions))

    tmp1 = []
    tmp2 = []

    for index, row in val_data_with_predictions.iterrows():
        newborn = row['Population'] * row['BirthRate']*10
        man = row['Male']/(row['Male']+row['Female'])
        tmp1.append(newborn*man)
        tmp2.append(newborn*(1-man))

    val_data_with_predictions["Age population, age 00, male, interpolated"] = tmp1
    val_data_with_predictions["Age population, age 00, female, interpolated"] = tmp2

    # 如果需要，可以选择保存测试集预测结果到Excel文件
    val_data_with_predictions.to_csv("csv/output.csv", mode='a', header=False, index=False)
    # val_data_with_predictions.to_csv("csv/test.csv", index=False)

if __name__ == '__main__':

    SVRLearning(2043)