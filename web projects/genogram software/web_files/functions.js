var current_id = 0;
base_colour = '#ff00ff';
second_colour = '#ff0000';
text_colour = '#000000'
dist_between = 50;
selected_id = -1;
min_x = 100000;
max_x = 0;
min_y = 100000;
max_y = 0;






function Node(name) {
    this.id = current_id;
    current_id = current_id + 1;
    this.name = name;
    this.dob = "";
    this.dod = "";
    this.description = "";
    this.gender = "";
    this.parent = null;
    this.children = [];
    this.partners = [];
    this.partnerParent = null;
}

function Tree(name) {
    var node = new Node(name);
    this._root = node;
}

Tree.prototype.traverseBF = function(callback) {
    var queue = [];
 
    queue.push(this._root);
 
    currentTree = queue[0];
    queue = queue.slice(1);
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.push(currentTree.children[i]);
        }
        callback(currentTree);
        currentTree = queue[0];
        queue = queue.slice(1);
    }
};

function findIndex(arr, id) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            index = i;
        }
    }
 
    return index;
}

Tree.prototype.remove = function(id, fromId, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.id === fromId) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, id);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};


Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.add = function(name, toId, traversal) {
    var child = new Node(name),
        parent = null,
        callback = function(node) {
            if (node.id === toId) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};


var trees = [];

function DrawTrees(){
    for (let i = 0; i < trees.length; i++) { 
  DrawTree(trees[i]._root, 1)
} 
}

function getNode(n, v) {
  n = document.createElementNS("http://www.w3.org/2000/svg", n);
  for (var p in v)
    n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
  return n
}

tree = new Tree('Father');


function removeNode(id, parent_id){
    if(parent_id == "NONE"){
        current_id = 0;
        tree = new Tree("Father");
    }else{
        tree.remove(id, parent_id, tree.traverseBF);
    }
    DrawTree(tree._root);
    
}


function EditNode(name){
    if(selected_id == name){
        selected_id = -1;
    }else{
        selected_id = name;
    }
    sub_button = document.getElementById('submit');
    sub_button.setAttribute('onclick', "SubmitInfo(" + name + ")");
    add_child = document.getElementById('add-child');
    add_child.setAttribute('onclick', "tree.add('child', " +  name + ", tree.traverseBF); DrawTree(tree._root);") ;
    add_partner = document.getElementById('add-partner');
    add_partner.setAttribute('onclick', "tree.addPartner('Partner', " +  name + ", tree.traverseBF); DrawTree(tree._root);") ;
    
     callback = function(node) {
            if (node.id === name) {
                parent = node;
            }
        };
    tree.contains(callback, tree.traverseBF);
    if (parent) {
        info = "SubmitInfo(" + name + ")";
        name_entry = document.getElementById('name');
        name_entry.setAttribute('onchange', info);
        name_entry.value = parent.name;
        DOB_entry = document.getElementById('DOB');
        DOB_entry.setAttribute('onchange', info);
        DOB_entry.value = parent.dob;
        DOD_entry = document.getElementById('DOD');
        DOD_entry.setAttribute('onchange', info);
        DOD_entry.value = parent.dod;
        gender_entry = document.getElementById('gender');
        gender_entry.setAttribute('onchange', info);
        gender_entry.value = parent.gender;
        description_entry = document.getElementById('description');
        description_entry.setAttribute('onchange', info);
        description_entry.value = parent.description;
    } else {
        throw new Error('Cannot Find Node.');
    }
    if(parent.parent){
    remove = document.getElementById('remove');
    remove.setAttribute('onclick', "removeNode(" + name + ", " + parent.parent.id + ")");
    }else{
    remove = document.getElementById('remove');
    remove.setAttribute('onclick', `removeNode(${name}, "NONE")`);
    }
    DrawTree(tree._root);
}




function SubmitInfo(id){
    new_name = document.getElementById("name").value;
    gender = document.getElementById("gender").value;
    dob = document.getElementById("DOB").value;
    dod = document.getElementById("DOD").value;
    description = document.getElementById('description').value;
    callback = function(node) {
            if (node.id === id) {
                parent = node;
            }
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
    }
    
    
}


var svg = getNode('svg', {width: '100%', height: 'auto'});
defs = getNode('defs');
svg.appendChild(defs);
var div = document.getElementById('main_div');
div.appendChild(svg);
svg.setAttribute('viewBox', "300 -150 500 500");




function ClearTree(){
    svg.innerHTML = '';
    svg.appendChild(defs);
}




function CountLeaves(node){
    if(node.partners.length >= 1 && node.children.length == 0){
        return 2 * node.partners.length;
    }
    if(node.children.length == 0){
        return 1;
    }
    sum = 0;
    for(let i = 0; i < node.children.length; i++){
        sum = sum + CountLeaves(node.children[i]);
    }
    if(node.partners.length > sum / 2){
        return 2 * node.partners.length;
    }
    return sum;
}

document.getElementById('main_color').value = base_colour;
document.getElementById('second_color').value = second_colour;
document.getElementById('text_color').value = text_colour;

if(localStorage.savedTree){
    tree = RestoreTree(JSON.parse(localStorage.savedTree));
}

DrawTree(tree._root);