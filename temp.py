import csv
import json

# CSV文件路径
csv_file_path = 'output.csv'
# 输出JSON文件路径
json_file_path = 'output.json'

# 读取CSV文件并转换为JSON
def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    # 将列表转换为JSON格式的字符串并写入文件
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(data, indent=4))

# 调用函数
csv_to_json(csv_file_path, json_file_path)
