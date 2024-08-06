with open('src/components/ScenathonPrivate/bib_text.txt', 'r') as bib_file:
    contents = bib_file.read()
    
references = contents.split('@')

fields_of_interest = ['author', 'title']

ref_objects = {}

for ref in references:
    
    if ref != '':
        
        field_list = ref.split('\n')
        ref_objects[ref.strip().split('{')[1].split(',')[0]] ={y: field.split('{')[1]  for field in field_list for y in fields_of_interest if (y in field) and ('book' not in field) }

print(ref_objects)        
        
            
            
    
