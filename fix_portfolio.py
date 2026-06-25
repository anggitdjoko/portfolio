import re

with open('src/data/portfolio.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the user's last experience entry (prof-0c)
last_user_exp_marker = "externalLink: null,\n        },\n    ],\n"
last_user_exp = content.rfind(last_user_exp_marker, 0, 2100)

if last_user_exp == -1:
    print('Could not find user experiences end')
else:
    # Find the education section after template experiences
    education_start = content.find('\n    education: [', last_user_exp + 100)
    
    if education_start == -1:
        print('Could not find education section')
    else:
        # Replace everything between user experiences and education
        new_content = content[:last_user_exp + len(last_user_exp_marker)] + content[education_start + 1:]
        
        with open('src/data/portfolio.ts', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('Fixed! Template experiences removed.')
