import csv
from collections import Counter, defaultdict
import re

csv_path = 'experience/PT Daya Kobelco Construction Machinery Indonesia/DKCMI 1.csv'

with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    rows = list(reader)

# Skip header
data = rows[1:]
print(f"=== KOBELCO SPARE PARTS ANALYSIS ===")
print(f"Total Transactions: {len(data)}")

# Parse sales amounts
def parse_amount(s):
    try:
        return float(s.replace(',', '').strip())
    except:
        return 0

# Total sales
total_sales = sum(parse_amount(row[5]) for row in data if len(row) > 5)
print(f"Total Sales: Rp {total_sales:,.0f}")

# Unique customers
customers = Counter(row[1] for row in data if len(row) > 1)
print(f"Unique Customers: {len(customers)}")

# Unique parts
parts = Counter(row[2] for row in data if len(row) > 2)
print(f"Unique Parts: {len(parts)}")

# Top 10 customers
print("\n=== TOP 10 CUSTOMERS ===")
for customer, count in customers.most_common(10):
    customer_sales = sum(parse_amount(row[5]) for row in data if row[1] == customer)
    print(f"{customer}: {count} transactions, Rp {customer_sales:,.0f}")

# Top 10 parts
print("\n=== TOP 10 PARTS ===")
for part, count in parts.most_common(10):
    part_sales = sum(parse_amount(row[5]) for row in data if row[2] == part)
    print(f"{part}: {count} sold, Rp {part_sales:,.0f}")

# Monthly breakdown
monthly = defaultdict(lambda: {'count': 0, 'sales': 0})
for row in data:
    if len(row) > 5:
        date = row[0]
        if '/' in date:
            month = date.split('/')[0]
            year = date.split('/')[2] if len(date.split('/')) > 2 else '2023'
            key = f"{year}-{month.zfill(2)}"
            monthly[key]['count'] += 1
            monthly[key]['sales'] += parse_amount(row[5])

print("\n=== MONTHLY BREAKDOWN ===")
for month in sorted(monthly.keys()):
    m = monthly[month]
    print(f"{month}: {m['count']} transactions, Rp {m['sales']:,.0f}")
