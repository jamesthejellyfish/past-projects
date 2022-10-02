function printTree(){
    tree_table = TreeTable(tree._root);
    size = Math.max(max_x - min_x + 60, max_y - min_y + 50);
    var WindowObject = window.open('',"Planned Timetable","left=0,top=0,toolbars=no,scrollbars=yes,status=no,resizable=no");
    var Page = `<style>.svgText{font-family: 'Poppins', sans-serif;} .table-responsive{display: block; width: 100%; overflow-x: auto;} table, th, td {border: 1px solid black;}</style><svg width="100%" viewBox="${min_x - 40} ${min_y - 40} ${size} ${size}" transform="rotate(90)">${svg.innerHTML}<div style="break-after: page;"></div><br><br><div class="table-responsive">
        <table class="table" style="width: 100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Date of Death</th>
                    <th>Gender</th>
                    <th>Parents</th>
                    <th>Children</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${tree_table}
            </tbody>
        </table>
    </div>`;
    
    WindowObject.document.writeln(Page);
    WindowObject.document.close();
    WindowObject.focus();
    WindowObject.print();
}

function TreeTable(node, is_partner = false){
    if(node.children[0]){
    var children = node.children[0].name;
    }else{
    var children = "";
    }
    var parents = "";
    var parent = "";
    var partnerParent = "";
    if(node.parent){
        parent = node.parent.name;
    }
    if(node.partnerParent){
        partnerParent = node.partnerParent.name;
    }
    if(partnerParent.length > 0 && parent.length > 0){
        parents = parent + ", " + partnerParent;
    }else{
        parents = parent;
    }
    for(let i=1; i<node.children.length; i++){
        children = children + ", " + node.children[i].name ;
    }
    var table_info = `<tr><td>${node.name}</td><td>${node.dob}</td><td>${node.dod}</td><td>${node.gender}</td><td>${parents}</td><td>${children}</td><td>${node.description}</td></tr>`;
    if (!is_partner){
    for(let i=0; i<node.partners.length; i++){
        table_info = table_info + TreeTable(node.partners[i], true);
    }
    for(let i=0; i<node.children.length; i++){
        table_info = table_info + TreeTable(node.children[i])
    }
        
    }
    return table_info;
}

