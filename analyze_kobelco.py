import csv
import os

# Read the first CSV file
csv_path = 'experience/PT Daya Kobelco Construction Machinery Indonesia/DKCMI 1.csv'
with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    rows = list(reader)
    print(f'Total rows: {len(rows)}')
    print(f'Columns: {rows[0] if rows else "empty"}')
    print('First 3 data rows:')
    for row in rows[1:4]:
        print(row)
