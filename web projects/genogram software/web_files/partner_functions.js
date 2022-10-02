Tree.prototype.addPartner = function(name, toId, traversal) {
    var partner = new Node(name),
        parent = null,
        callback = function(node) {
            if (node.id === toId) {
                topartner = node;
            }
        };
 
    this.contains(callback, traversal);
    topartner.partners.push(partner);
    partner.partners.push(topartner);
};


function EditPartnerNode(name){
    if(selected_id == name){
        selected_id = -1;
    }else{
        selected_id = name;
    }
    sub_button = document.getElementById('submit');
    sub_button.setAttribute('onclick', "SubmitPartnerInfo(" + name + ")");
    add_child = document.getElementById('add-child');
    add_child.setAttribute('onclick', "AddPartnerChild(" + name + ")") ;
     callback = function(node) {
         for (let i = 0; i < node.partners.length; i++){
            if (node.partners[i].id === name) {
                parent = node.partners[i];
            }}
        };
    tree.contains(callback, tree.traverseBF);
    if (parent) {
        info = "SubmitPartnerInfo(" + name + ")";
        name_entry = document.getElementById('name');
        name_entry.value = parent.name;
        name_entry.setAttribute('onchange', info);
        DOB_entry = document.getElementById('DOB');
        DOB_entry.value = parent.dob;
        DOB_entry.setAttribute('onchange', info);
        DOD_entry = document.getElementById('DOD');
        DOD_entry.value = parent.dod;
        DOD_entry.setAttribute('onchange', info);
        gender_entry = document.getElementById('gender');
        gender_entry.value = parent.gender;
        gender_entry.setAttribute('onchange', info);
        description_entry = document.getElementById('description');
        description_entry.setAttribute('onchange', info);
        description_entry.value = parent.description;
    } else {
        throw new Error('Cannot Find Node.');
    }
    DrawTree(tree._root);
    remove = document.getElementById('remove');
    remove.setAttribute('onclick', "RemovePartner(" + name + ")");
}


function SubmitPartnerInfo(id){
    new_name = document.getElementById("name").value;
    gender = document.getElementById("gender").value;
    dob = document.getElementById("DOB").value;
    dod = document.getElementById("DOD").value;
    description = document.getElementById('description').value;
    callback = function(node) {
            for(let i=0; i<node.partners.length; i++){
            if (node.partners[i].id === id) {
                parent = node.partners[i];
            }}
        };
    tree.contains(callback, tree.traverseBF);
    if (parent) {
        parent.name = new_name;
        parent.dob = dob;
        parent.dod = dod;
        parent.gender = gender;
        parent.description = description;
        DrawTree(tree._root);
    } else {
        throw new Error('Cannot find Node.');
    }}

function AddPartnerChild(id){
     callback = function(node) {
            for(let i=0; i<node.partners.length; i++){
            if (node.partners[i].id === id) {
                parent = node.partners[i];
            }}
        };
    tree.contains(callback, tree.traverseBF);
    tree.add('child', parent.partners[0].id, tree.traverseBF); 
    new_child = parent.partners[0].children[parent.partners[0].children.length - 1];
    new_child.partnerParent = parent;
    parent.children.push(new_child);
    DrawTree(tree._root);
}
    

function RemovePartner(partner_id){
    callback = function(node) {
            for(let i=0; i<node.partners.length; i++){
            if (node.partners[i].id === partner_id) {
                parent = node.partners;
                index = i;
            }}
        };
    tree.contains(callback, tree.traverseBF);
    parent.splice(index, 1);
    DrawTree(tree._root);
}