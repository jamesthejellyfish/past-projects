function DrawText(caption, x, y, wrap=true) {
    //  This function attempts to create a new svg "text" element, chopping 
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttributeNS(null, 'x', x);
    svgText.setAttributeNS(null, 'y', y);
    svgText.setAttributeNS(null, 'class', 'svgText');
    svgText.setAttributeNS(null, 'font-size', 7);
    svgText.setAttributeNS(null, 'fill', text_colour);        
    svgText.setAttributeNS(null, 'text-anchor', 'middle');   //  Center the text

    //  The following two variables should really be passed as parameters
    var MAXIMUM_CHARS_PER_LINE = 10;
    var LINE_HEIGHT = 12;
    var words = caption.split(" ");
    var line = "";
    if(!wrap){
        y = y - LINE_HEIGHT;
        var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        svgTSpan.setAttributeNS(null, 'x', x);
        svgTSpan.setAttributeNS(null, 'y', y);
        var tSpanTextNode = document.createTextNode(caption);
        svgTSpan.appendChild(tSpanTextNode);
        svgText.appendChild(svgTSpan);
        svg.appendChild(svgText);
        return svgText;
        
    }
    NUM_LINES = 1;
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        if (testLine.length > MAXIMUM_CHARS_PER_LINE)
        {
            NUM_LINES = NUM_LINES + 1;
            line = words[n] + " ";
        }else{
            line = testLine;
        }
    }
    line = "";
    y = y - LINE_HEIGHT * NUM_LINES;
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        if (testLine.length > MAXIMUM_CHARS_PER_LINE)
        {
            //  Add a new <tspan> element
            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', x);
            svgTSpan.setAttributeNS(null, 'y', y);

            var tSpanTextNode = document.createTextNode(line);
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n] + " ";
            y += LINE_HEIGHT;
        }
        else {
            line = testLine;
        }
    }

    var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', x);
    svgTSpan.setAttributeNS(null, 'y', y);

    var tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);
    svg.appendChild(svgText);
    return svgText;
}





function DrawLine(x1, y1, x2, y2, type){
    var l = getNode('line', {x1: x1, y1: y1, x2: x2, y2: y2, stroke: base_colour});
    svg.appendChild(l);
}

function DrawSquare(x, y, id){
    var width = 20;
    var height = 20;
    var s = getNode('rect', {x: x - width / 2, y: y - width / 2, width: 20, height: 20, fill: base_colour, onclick: 'EditNode(' + id + ')'});
    svg.appendChild(s);
    return s
}

function DrawCircle(x, y, id){
    var r = getNode('circle', { cx: x, cy: y, r: 10, fill: base_colour, onclick: 'EditNode(' + id + ')' });
    svg.appendChild(r);
    return r
}

function DrawTriangle(x, y, id){
    x = x - 10;
    y = y - 10;
    var r = getNode('path', {d: `M${x} ${y + 20} L${x + 20} ${y + 20} L${x + 10} ${y} L${x} ${y + 20} Z`, fill: base_colour, onclick: `EditNode(${id})`});
    svg.appendChild(r);
    return r;
}


function DrawNode(x, y, node){
    if(x < min_x){
        min_x = x;
    }
    if(x > max_x){
        max_x = x;
    }
    if(y < min_y){
        min_y = y;
    }
    if(y > max_y){
        max_y = y;
    }
    CreateNodePatterns(node);
    if(node.gender == 'male'){
        drawn_node =  DrawSquare(x, y, node.id);
    }else if (node.gender == 'female'){
        drawn_node = DrawCircle(x, y, node.id);
    }else {
        drawn_node = DrawTriangle(x, y, node.id);
    }
    
   
    if(document.getElementById('show_names').checked){
        if(document.getElementById('show_dob').checked){
            DrawText(node.name, x, y - 10);
        }else{
            DrawText(node.name, x, y);
        }
        
    }

    if(document.getElementById('show_dob').checked){
        DrawText(node.dob.split('-')[0] + " - " + node.dod.split('-')[0], x, y, false);
    }
    if(selected_id == node.id){
        drawn_node.setAttribute('fill', second_colour);
    }else{
    drawn_node.setAttributeNS(null, 'fill', "url('#node-" + node.id + "')");
}
    
    return drawn_node;
    
}

function DrawPartners(x, y, node){
    for (let i = 0; i < node.partners.length; i++){
        partner_node = DrawNode(x - 40*(i + 1), y, node.partners[i]);
        partner_node.setAttribute('onclick', 'EditPartnerNode(' + node.partners[i].id + ')');
        DrawLine(x - 40*i - 10, y, x - 40*(i + 1) + 10, y);
    }
}


function DrawTree(tree, depth = 1, initx = 500){
    if (depth == 1){
    ClearTree();
    defs.innerHTML = '';
    localStorage.savedTree = JSON.stringify(ConvertTree(tree));
    localStorage.savedKeywords = JSON.stringify(keywords);
    }
    var inity = 50*depth
    
    
    var acc = 0;
    var initx1 = 0;
    for (let i = 0; i < tree.children.length; i++) {
        var new_x = initx + 50 * (2*(acc + (CountLeaves(tree.children[i])  - 1)/ 2) - CountLeaves(tree) + 1) / 2;
            if(tree.children[i].partnerParent != null){
                index = tree.partners.indexOf(tree.children[i].partnerParent);
                initx1 = initx + 40 - 40*(index + 1);
            }else{
            if(tree.partners.length > 0){
                initx1 = initx + 20;
            }else{
                initx1 = initx;
            }
                 }
        
        
            if(tree.children[i].dob != "" && (tree.children[i + 1] && tree.children[i].dob == tree.children[i + 1].dob)){
                if(tree.children[i].partners.length > 0){
                DrawLine(initx1, inity, initx1, inity + 25);
                DrawLine(initx1, inity + 25, new_x + 45, inity + 25);
                DrawLine(new_x + 45, inity + 25, new_x + 20, inity + 50);
                }else{
                DrawLine(initx1, inity, initx1, inity + 25);
                DrawLine(initx1, inity + 25, new_x + 25, inity + 25);
                DrawLine(new_x + 25, inity + 25, new_x, inity + 50);
                }
            }else{
            if(tree.children[i].dob != "" && (tree.children[i - 1] && tree.children[i].dob == tree.children[i - 1].dob)){
               
                if(tree.children[i].partners.length > 0){
                DrawLine(initx1, inity, initx1, inity + 25);
                DrawLine(initx1, inity + 25, new_x - 5, inity + 25);
                DrawLine(new_x - 5, inity + 25, new_x + 20, inity + 50);
                }else{
                DrawLine(initx1, inity, initx1, inity + 25);
                DrawLine(initx1, inity + 25, new_x - 25, inity + 25);
                DrawLine(new_x - 25, inity + 25, new_x, inity + 50);
                }
                
                }else{
            if(tree.children[i].partners.length > 0){
            DrawLine(initx1, inity, initx1, inity + 25);
            DrawLine(initx1, inity + 25, new_x + 20, inity + 25);
            DrawLine(new_x + 20, inity + 25, new_x + 20, inity + 50);
            }else{
            DrawLine(initx1, inity, initx1, inity + 25);
            DrawLine(initx1, inity + 25, new_x, inity + 25);
            DrawLine(new_x, inity + 25, new_x, inity + 40);
        }}
            }
        
            
        DrawTree(tree.children[i], depth + 1, new_x);
        
        acc = acc + CountLeaves(tree.children[i]);
    }
    if(tree.partners.length > 0){
    DrawNode(initx + 20, inity, tree);
    DrawPartners(initx + 20, inity, tree);
    }else{
    DrawNode(initx, inity, tree);
    DrawPartners(initx, inity, tree); 
    }
}
