with open('src/data/portfolio.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start of projects array and the data-analyst-dashboard project
projects_start = None
cv_projects_start = None

for i, line in enumerate(lines):
    if 'projects: [' in line and projects_start is None:
        projects_start = i
    if "slug: 'data-analyst-dashboard'" in line:
        cv_projects_start = i
        break

if projects_start and cv_projects_start:
    # Keep everything before projects array, then add CV projects
    new_lines = lines[:projects_start + 1]  # Include 'projects: ['
    new_lines.extend(lines[cv_projects_start - 2:])  # Include the CV projects
    
    with open('src/data/portfolio.ts', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f'Removed {cv_projects_start - projects_start - 1} lines of template projects')
else:
    print(f'Could not find markers: projects_start={projects_start}, cv_projects_start={cv_projects_start}')
