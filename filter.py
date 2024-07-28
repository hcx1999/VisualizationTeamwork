import csv
import json

input_csv_file_path = 'gender_chn.csv'
output_csv_file_path = 'output.csv'
filter = ''
temp = ''

def read_csv_to_array(csv_file_path):
    with open(csv_file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        data = list(reader)
    return data

def filter_data(data, filter_func):
    return [row for row in data if filter_func(row)]

def write_array_to_csv(array, csv_file_path):
    with open(csv_file_path, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(array)

def my_filter(row):
    return row[3] == filter or row[0] == 'Country Name'

def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json_file.write(to_js(json.dumps(data, indent=4)))

def to_js(to_json):
    return 'var ' + temp + ' = ' + to_json

if __name__ == "__main__":

    data = read_csv_to_array(input_csv_file_path)

    filter = 'Age population, age 00, female, interpolated'
    temp = 'femaleNewborn'
    filtered_data = filter_data(data, my_filter)
    write_array_to_csv(filtered_data, output_csv_file_path)
    csv_to_json(output_csv_file_path, 'js/femaleNewborn.js')
    
    filter = 'Age population, age 00, male, interpolated'
    temp = 'maleNewborn'
    filtered_data = filter_data(data, my_filter)
    write_array_to_csv(filtered_data, output_csv_file_path)
    csv_to_json(output_csv_file_path, 'js/maleNewborn.js')

    filter = 'Fertility rate, total (births per woman)'
    temp = 'fertility'
    filtered_data = filter_data(data, my_filter)
    write_array_to_csv(filtered_data, output_csv_file_path)
    csv_to_json(output_csv_file_path, 'js/fertility.js')
    
    filter = 'Mortality rate, adult, male (per 1,000 male adults)'
    temp = 'maleMortality'
    filtered_data = filter_data(data, my_filter)
    write_array_to_csv(filtered_data, output_csv_file_path)
    csv_to_json(output_csv_file_path, 'js/maleMortality.js')

    filter = 'Mortality rate, adult, female (per 1,000 female adults)'
    temp = 'femaleMortality'
    filtered_data = filter_data(data, my_filter)
    write_array_to_csv(filtered_data, output_csv_file_path)
    csv_to_json(output_csv_file_path, 'js/femaleMortality.js')
