with open('src/data/portfolio.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

depth = 0
for i, line in enumerate(lines, 1):
    # Skip strings (simple approach)
    in_string = False
    for j, char in enumerate(line):
        if char == '"' and (j == 0 or line[j-1] != '\\'):
            in_string = not in_string
        if not in_string:
            if char == '{':
                depth += 1
            elif char == '}':
                depth -= 1
    if depth < 0:
        print(f'ERROR at line {i}: depth={depth}')
        print(f'  Content: {line.rstrip()[:100]}')
        # Show context
        for k in range(max(0, i-3), min(len(lines), i+2)):
            print(f'  {k+1}: {lines[k].rstrip()[:100]}')
        break

print(f'Final depth: {depth}')
print(f'Total lines: {len(lines)}')
