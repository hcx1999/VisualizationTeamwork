# https://data.humdata.org/dataset/world-bank-gender-indicators-for-china
# https://data.stats.gov.cn/easyquery.htm?cn=C01

import csv
import pandas as pd
import json
import os
import boosting

csv_file_path = 'csv/gender_chn.csv'
Names = ['Age population, age 00, female, interpolated', 
         'Age population, age 00, male, interpolated', 
         'Fertility rate, total (births per woman)', 
         'Mortality rate, adult, male (per 1,000 male adults)', 
         'Mortality rate, adult, female (per 1,000 female adults)', 
         'Life expectancy at birth, male (years)', 
         'Life expectancy at birth, female (years)']
output = []

def wash(colomn_name):

    df = pd.read_csv(csv_file_path)
    f = []
    for index, row in df.iterrows():
        
        if row[3] == colomn_name:
            f.append(row)

    Year = []
    Value = []
    for i in f:
        if i.Year > '2021':
            continue
        # print(i)
        Year.append(i.Year)
        Value.append(i.Value)

    output['Year'] = Year
    output[colomn_name] = Value

def pop():
    
    csv_files = ['csv/population1.csv', 'csv/population2.csv', 'csv/output.csv']
    combine = [pd.read_csv(file) for file in csv_files]
    # combine = pd.concat(combine, ignore_index=True)
    for form in combine:
        
        for col in form.columns:
            # print(list(form[col]))
            output[col] = list(form[col])

    # combine.to_csv('csv/combined.csv', index=False)

def csv_to_json():
    data = []
    with open('csv/output.csv', mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    # print(data)
    with open('json/backup.js', mode='w', encoding='utf-8') as json_file:
        json_file.write(to_js(json.dumps(data, indent=4)))

def to_js(to_json):
    return 'var DATA_BACKUP = ' + to_json

if __name__ == '__main__':

    output = pd.DataFrame()
    for i in Names:
        wash(i)
    output.to_csv('csv/output.csv', index=False)
    pop()
    output.to_csv('csv/output.csv', index=False)
    # os.system("python boosting.py")
    boosting.SVRLearning(2040)
    csv_to_json()
