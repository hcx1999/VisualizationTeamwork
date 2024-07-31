# https://data.stats.gov.cn/easyquery.htm?cn=C01

import csv
import json

path1 = 'csv/population1.csv'
path2 = 'csv/population2.csv'
encode='utf-8'

Population = []
Male = []
Female = []
City = []
Countryside = []
BirthRate = []
DeathRate = []
GrowthRate = []

def fun1():

    with open(path1, newline='', encoding=encode) as csv_file:

        reader = csv.reader(csv_file)
        first = next(reader)
        # data = []
        num_row=0
        for row in reader:
            num_col=0
            for cell in row:
                set = {
                    "Year": first[num_col],
                    "Name": row[0],
                    "Value": cell
                }
                insert(set)
                # data.append(set)
                num_col+=1
            num_row+=1
        # print(data)

    name = 'Population'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(Population)), indent=4)))
    name = 'Male'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(Male)), indent=4)))
    name = 'Female'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(Female)), indent=4)))
    name = 'City'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(City)), indent=4)))
    name = 'Countryside'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(Countryside)), indent=4)))

def to_js(name, to_json):
    # print(name)
    return 'var ' + name + ' = ' + to_json

def insert(element):
    if element['Year'] == 'Year':
        return
    elif element['Name'] == 'BirthRate':
        BirthRate.append(element)
    elif element['Name'] == 'DeathRate':
        DeathRate.append(element)
    elif element['Name'] == 'GrowthRate':
        GrowthRate.append(element)
    elif element['Name'] == 'Population':
        Population.append(element)
    elif element['Name'] == 'Male':
        Male.append(element)
    elif element['Name'] == 'Female':
        Female.append(element)
    elif element['Name'] == 'City':
        City.append(element)
    elif element['Name'] == 'Countryside':
        Countryside.append(element)


def fun2():

    with open(path2, newline='', encoding=encode) as csv_file:

        reader = csv.reader(csv_file)
        first = next(reader)
        # data = []
        num_row=0
        for row in reader:
            num_col=0
            for cell in row:
                set = {
                    "Year": first[num_col],
                    "Name": row[0],
                    "Value": cell
                }
                insert(set)
                # data.append(set)
                num_col+=1
            num_row+=1
        # print(data)

    name = 'BirthRate'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(BirthRate)), indent=4)))
    name = 'DeathRate'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(DeathRate)), indent=4)))
    name = 'GrowthRate'
    path = 'json/' + name + '.js'
    with open(path, mode='w', encoding=encode) as json_file:
        json_file.write(to_js(name, json.dumps(list(reversed(GrowthRate)), indent=4)))

if __name__ == '__main__':

    fun1()
    fun2()
