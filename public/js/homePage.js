function getDay(year,month){
	var days = [31,28,31,30,31,30,31,31,30,31,30,31];
	if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) days[1]++;
	return days[month-1];
}

function addList(){
	var addList = document.getElementById("addList");
	if(addList.style.display == "none") addList.style.display = "block";
	else addList.style.display = "none";
}

function check_list(){
	if(document.getElementById("listName").value == "")return false;
	return true;
}

function check_search(){
	if(document.getElementById("search").value == "")return false;
	return true;
}

function deleteThing(id,list){
	location.href = "/delete?id="+id+"&list="+list;
}

function removeThing(id){
	location.href = "/remove?id="+id;
}

function deleteList(id){
	location.href = "/deleteList?id="+id;
}

function show_all(){
	document.getElementById("cover").style.display = "block";
	document.getElementById("addThing").style.display = "block";
}

function hide_all(){
	document.getElementById("cover").style.display = "none";
	document.getElementById("addThing").style.display = "none";
}
