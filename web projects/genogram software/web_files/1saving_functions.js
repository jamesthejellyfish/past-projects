function ConvertTree(node, include_partners = true){
    var converted_array = [];
    converted_array.push(node.id);
    converted_array.push(node.name);
    converted_array.push(node.dob);
    converted_array.push(node.dod);
    converted_array.push(node.description);
    converted_array.push(node.gender);
    if(node.parent){
    converted_array.push(node.parent.id);
    }else{
    converted_array.push(null);
    }
    var children_array = [];
    for(let i=0; i<node.children.length; i++){
        children_array.push(ConvertTree(node.children[i]));
    }
    converted_array.push(children_array);
    if(include_partners){
    var partner_array = [];
    for(let i=0; i<node.partners.length; i++){
        partner_array.push(ConvertTree(node.partners[i], false));
    }
    converted_array.push(partner_array);
    }else{
        converted_array.push(node.partners[0].id);
    }
    if(node.partnerParent){
    converted_array.push(node.partnerParent.id);
    }else{
    converted_array.push(null);
    }
    return converted_array;
}

function RestoreTree(converted_array, depth = 0){
    var new_node = new Node('');
    if(depth == 0){
        new_tree = new Tree('');
        new_tree._root = new_node;
    }
    if(converted_array[0] > current_id){
        current_id = converted_array[0] + 1;
    }
    new_node.id = converted_array[0];
    new_node.name = converted_array[1];
    new_node.dob = converted_array[2];
    new_node.dod = converted_array[3];
    new_node.description = converted_array[4];
    new_node.gender = converted_array[5];
    
    
    
    
    if(converted_array[6] == null){
    new_node.parent = null;
    }else{
        callback = function(node) {
            if (node.id === converted_array[6]) {
                parent = node;
            }
        };
        new_tree.contains(callback, new_tree.traverseBF);
        if(parent){
            new_node.parent = parent;
        }
    }  
    
if(Number.isInteger(converted_array[8])){
       callback = function(node) { 
        if (node.id === converted_array[8]) {
                parent = node;
            }
        };
        new_tree.contains(callback, new_tree.traverseBF);
    if(parent){
            new_node.partners.push(parent);
        }
    }else{
    for(let i=0; i<converted_array[8].length; i++){
        new_node.partners.push(RestoreTree(converted_array[8][i], depth + 1));
    }
   } 
    
    for(let i=0; i<converted_array[7].length; i++){
        new_node.children.push(RestoreTree(converted_array[7][i], depth + 1));
    }
    
  if(converted_array[9] == null){
        new_node.partnerParent = null;
    }else{
        callback = function(node) {
         for (let i = 0; i < node.partners.length; i++){
            if (node.partners[i].id == converted_array[9]) {
                parent = node.partners[i];
            }}
        };
        new_tree.contains(callback, new_tree.traverseBF);
            new_node.partnerParent = parent;
    }
    
    if(depth == 0){
        return new_tree;
    }else{
        return new_node;
    }
    
}