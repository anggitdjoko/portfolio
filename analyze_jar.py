import csv

csv_path = 'experience/PT JAR Andalan Rasa/Soal Test Offline - DA_PT JAR Andalan Rasa_Anggit Djoko.xlsx'

# Try to read as CSV first (xlsx might not work with csv module)
try:
    import openpyxl
    wb = openpyxl.load_workbook(csv_path)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    print(f"=== PT JAR ANDALAN RASA ANALYSIS ===")
    print(f"Total rows: {len(rows)}")
    print(f"Columns: {rows[0] if rows else 'empty'}")
    print("First 3 data rows:")
    for row in rows[1:4]:
        print(row)
except Exception as e:
    print(f"Error: {e}")
    # Try as CSV
    try:
        with open(csv_path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.reader(f)
            rows = list(reader)
            print(f"=== PT JAR ANDALAN RASA ANALYSIS ===")
            print(f"Total rows: {len(rows)}")
            print(f"Columns: {rows[0] if rows else 'empty'}")
            print("First 3 data rows:")
            for row in rows[1:4]:
                print(row)
    except Exception as e2:
        print(f"CSV Error: {e2}")
