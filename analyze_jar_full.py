import openpyxl
from collections import Counter, defaultdict

xlsx_path = 'experience/PT JAR Andalan Rasa/Soal Test Offline - DA_PT JAR Andalan Rasa_Anggit Djoko.xlsx'
wb = openpyxl.load_workbook(xlsx_path)
ws = wb.worksheets[2]  # DATASET TEST 3

rows = list(ws.iter_rows(values_only=True))
header = rows[0]
data = rows[1:]

print(f"=== PT JAR ANDALAN RASA - RESTAURANT ANALYSIS ===")
print(f"Total Records: {len(data)}")

# Parse data
categories = Counter()
items = Counter()
sales_types = Counter()
payment_methods = Counter()
total_gross = 0
total_net = 0
total_discount = 0

for row in data:
    if len(row) >= 12:
        cat = row[3] or 'Unknown'
        item = row[4] or 'Unknown'
        gross = row[7] or 0
        discount = row[8] or 0
        net = row[9] or 0
        sales_type = row[10] or 'Unknown'
        payment = row[11] or 'Unknown'
        
        categories[cat] += 1
        items[item] += 1
        sales_types[sales_type] += 1
        payment_methods[payment] += 1
        total_gross += gross
        total_discount += discount
        total_net += net

print(f"\nTotal Gross Sales: Rp {total_gross:,.0f}")
print(f"Total Discounts: Rp {total_discount:,.0f}")
print(f"Total Net Sales: Rp {total_net:,.0f}")
print(f"Discount Rate: {total_discount/total_gross*100:.1f}%")

print(f"\n=== CATEGORIES ===")
for cat, count in categories.most_common():
    print(f"{cat}: {count} items")

print(f"\n=== TOP 10 ITEMS ===")
for item, count in items.most_common(10):
    print(f"{item}: {count} sold")

print(f"\n=== SALES TYPE ===")
for st, count in sales_types.most_common():
    print(f"{st}: {count} ({count/len(data)*100:.1f}%)")

print(f"\n=== PAYMENT METHODS ===")
for pm, count in payment_methods.most_common():
    print(f"{pm}: {count} ({count/len(data)*100:.1f}%)")
