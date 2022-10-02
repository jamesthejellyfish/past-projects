keywords = [];
if (localStorage.savedKeywords){
    keywords = JSON.parse(localStorage.savedKeywords);
    DrawKeyword();
}

function addKeyword(){
    keywords.push(['smDots', '#000000', '']);
    DrawKeyword();
}

function removeKeyword(index){
    keywords.splice(index, 1);
    DrawKeyword();
}

function DrawKeyword(){
    x = document.getElementById('list');
    x.innerHTML = '';
    for(let i=0; i<keywords.length; i++){
        form = document.createElement('div');
        form.setAttributeNS(null, 'class', 'form-group');
        close = document.createElement('i');
        close.setAttributeNS(null, 'class', 'fa fa-close');
        close.setAttributeNS(null, 'style', 'cursor: pointer; color: rgb(181,37,37)');
        close.setAttributeNS(null, 'onclick', 'removeKeyword(' + i + ')');
        form.appendChild(close);
        
        
        options = document.createElement('select');
        optgroup = document.createElement('optgroup');
        optgroup.setAttributeNS(null, 'label', 'pick the pattern');
        options.appendChild(optgroup);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'smDots');
        option.innerHTML = "Small Polka Dots";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'lgDots');
        option.innerHTML = "Large Polka Dots";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'smLines');
        option.innerHTML = "Thin Diagonal Lines";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'lgLines');
        option.innerHTML = "Thick Diagonal Lines";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'inLines');
        option.innerHTML = "Inverted Diagonal Lines";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', 'veLines');
        option.innerHTML = "Vertical Lines";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', '1qua');
        option.innerHTML = "Solid colour 1st Quadrant";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', '2qua');
        option.innerHTML = "Solid colour 2nd Quadrant";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', '3qua');
        option.innerHTML = "Solid colour 3rd Quadrant";
        optgroup.appendChild(option);
        option = document.createElement('option');
        option.setAttributeNS(null, 'value', '4qua');
        option.innerHTML = "Solid colour 4th Quadrant";
        optgroup.appendChild(option);

        options.setAttributeNS(null, 'onchange', 'ChangeKeywords()');
        options.setAttributeNS(null, 'id', i + 'options');
        options.value = keywords[i][0];
        form.appendChild(options);
        
        color = document.createElement('input');
        color.setAttributeNS(null, 'type', 'color');
        
        color.setAttributeNS(null, 'onchange', 'ChangeKeywords()');
        color.setAttributeNS(null, 'id', i + 'color');
        color.value = keywords[i][1];
        form.appendChild(color);
        
        keyword = document.createElement('input');
        keyword.setAttributeNS(null, 'type', 'text');
        keyword.setAttributeNS(null, 'placeholder', 'keyword to look for');
        keyword.setAttributeNS(null, 'id', i + 'keyword');
        keyword.setAttributeNS(null, 'onchange', 'ChangeKeywords()');
        keyword.value = keywords[i][2];
        
        form.appendChild(keyword);
        
        x.appendChild(form);
    }
    DrawTree(tree._root);
}

function CreatePatterns(){        
    pattern_dict = {'smDots': [2.857142857142857, [['circle', 1.4285714285714286, 1.4285714285714286, 0.2857142857142857], ['circle', 0, 0, 0.2857142857142857], ['circle', 0.0, 2.857142857142857, 0.2857142857142857], ['circle', 2.857142857142857, 0.0, 0.2857142857142857], ['circle', 2.857142857142857, 2.857142857142857, 0.2857142857142857]]], 'lgDots': [2.857142857142857, [['circle', 1.4285714285714286, 1.4285714285714286, 0.5714285714285714], ['circle', 0, 0, 0.5714285714285714], ['circle', 0.0, 2.857142857142857, 0.5714285714285714], ['circle', 2.857142857142857, 0.0, 0.5714285714285714], ['circle', 2.857142857142857, 2.857142857142857, 0.5714285714285714]]], 'smLines': [2.857142857142857, [['path', 'M 0.0,2.857142857142857 l 2.857142857142857,-2.857142857142857 M -0.7142857142857143,0.7142857142857143 l 1.4285714285714286,-1.4285714285714286 M 2.142857142857143,3.5714285714285716 l 1.4285714285714286,-1.4285714285714286', '0.2857142857142857']]], 'lgLines': [2.857142857142857, [['path', 'M 0.0,2.857142857142857 l 2.857142857142857,-2.857142857142857 M -0.7142857142857143,0.7142857142857143 l 1.4285714285714286,-1.4285714285714286 M 2.142857142857143,3.5714285714285716 l 1.4285714285714286,-1.4285714285714286', '0.5714285714285714']]], 'inLines': [8.571428571428571, [['path', 'M 0.0,8.571428571428571 l 8.571428571428571,-8.571428571428571 M -2.142857142857143,2.142857142857143 l 4.285714285714286,-4.285714285714286 M 6.428571428571429,10.714285714285714 l 4.285714285714286,-4.285714285714286', '5.714285714285714']]], '1qua': [20, [['rect', '10', '0', '0']]], '2qua': [20, [['rect', '10', '10', '0']]], '3qua': [20, [['rect', '10', '0', '10']]], '4qua': [20, [['rect', '10', '10', '10']]], 'veLines': [2.857142857142857, [['path', 'M 1.4285714285714286, 0.0 l 0.0, 2.857142857142857', '0.14285714285714285']]]};
    for(let i=0; i<keywords.length; i++){
        pattern = getNode('pattern', {id: 'base-' + i, width: pattern_dict[keywords[i][0]][0], height: pattern_dict[keywords[i][0]][0]});
        pattern.setAttributeNS(null, 'patternUnits', 'userSpaceOnUse');
        for(let j=0; j<pattern_dict[keywords[i][0]][1].length; j++){
            if(pattern_dict[keywords[i][0]][1][j][0] == 'circle'){
                x = getNode('circle', {cx: pattern_dict[keywords[i][0]][1][j][1], cy: pattern_dict[keywords[i][0]][1][j][2], r: pattern_dict[keywords[i][0]][1][j][3], fill: keywords[i][1]});
            }
            if(pattern_dict[keywords[i][0]][1][j][0] == 'path'){
                x = getNode('path', {d: pattern_dict[keywords[i][0]][1][j][1], 'stroke-width': pattern_dict[keywords[i][0]][1][j][2], stroke: keywords[i][1], 'shape-rendering': "auto", 'stroke-linecap': "square"});
            }
            if(pattern_dict[keywords[i][0]][1][j][0] == 'rect'){
                x = getNode('rect', {x: pattern_dict[keywords[i][0]][1][j][2], y: pattern_dict[keywords[i][0]][1][j][3], width: pattern_dict[keywords[i][0]][1][j][1], height: pattern_dict[keywords[i][0]][1][j][1], fill: keywords[i][1]});
            }
            pattern.appendChild(x);
        }
    defs.appendChild(pattern);
    }
}

function ChangeKeywords(){
    for(let i=0; i<keywords.length; i++){
        options = document.getElementById(i + 'options');
        keywords[i][0] = options.value;
        color = document.getElementById(i + 'color');
        keywords[i][1] = color.value;
        keyword = document.getElementById(i + 'keyword');
        keywords[i][2] = keyword.value;
        DrawTree(tree._root)
    }
}

function CreateNodePatterns(node){
    CreatePatterns();
    pattern = getNode('pattern', {id: 'node-' + node.id, width: 1, height: 1});
    pattern.setAttributeNS(null, 'patternUnits', 'objectBoundingBox');
    rect = getNode('rect', {x: 0, y: 0, width: 20, height: 20, fill: base_colour});
    pattern.appendChild(rect);
    for(let i=0; i<keywords.length; i++){
        if(node.description.indexOf(keywords[i][2]) != -1){
            pattern_rect = getNode('rect', {x: 0, y: 0, width: 20, height: 20, fill: "url('#base-" + i + "')"});
            pattern.appendChild(pattern_rect);
        }
    }
    defs.appendChild(pattern);
}