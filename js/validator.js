var tabela = [];
var elements = 1;
var storage = 0;
var koszyk = 0;
var html_tabela = '';

function daneStartowe()
{
	var tabela = [];
	var obj1 = {id:elements, nazwa:"Kaguyasama", kod:"MG-01", netto:"20.32", VAT:"23", brutto:"24.99", kategoria:"Manga", opcje:"Nowe, Seria krótka", ocena:"5", zdj:"kaguyasama.png"};
	elements=elements + 1;
	
	var obj2 = {id:elements, nazwa:"Another", kod:"MG-02", netto:"20.49", VAT:"23", brutto:"25.20", kategoria:"Manga", opcje:"Nowe, 18+, Seria krótka", ocena:"4", zdj:"another.png"};
	elements=elements + 1;
	
	var obj3 = {id:elements, nazwa:"Sword Art Online", kod:"LN-01", netto:"20.24", VAT:"23", brutto:"24.90", kategoria:"Light Novel", opcje:"Używane, Seria długa", ocena:"3", zdj:"sao.png"};
	elements=elements + 1;
	
	var obj4 = {id:elements, nazwa:"Magazyn Otaku", kod:"MO-01", netto:"8.12", VAT:"23", brutto:"9.99", kategoria:"Magazyn", opcje:"Nowe, Seria długa", ocena:"4", zdj:"magazine.png"};
	elements=elements + 1;
	
	tabela.push(obj1);
	tabela.push(obj2);
	tabela.push(obj3);
	tabela.push(obj4);
	
	//var rekord = '';
	
	for (var i=0; i<tabela.length; i++)
	{
		var rekord = '<tr>';
		rekord += '<td id="tdname'+tabela[i].id+'">' + tabela[i].nazwa + '</td>';
		rekord += '<td id="tdkod'+tabela[i].id+'">' + tabela[i].kod + '</td>';
		rekord += '<td id="tdnetto'+tabela[i].id+'">' + tabela[i].netto + '</td>';
		rekord += '<td id="tdvat'+tabela[i].id+'">' + tabela[i].VAT + '</td>';
		rekord += '<td id="tdbrutto'+tabela[i].id+'">' + tabela[i].brutto + '</td>';
		rekord += '<td id="tdkategoria'+tabela[i].id+'">' + tabela[i].kategoria + '</td>';
		rekord += '<td id="tdopcje'+tabela[i].id+'">' + tabela[i].opcje + '</td>';
		rekord += '<td id="tdocena'+tabela[i].id+'">' + tabela[i].ocena + '</td>';
		rekord += '<td id="tdzdj'+tabela[i].id+'">' + tabela[i].zdj + '</td>';
		rekord += '<td class="text-center"> <button id="'+tabela[i].id+'" type="button" class="btn btn-outline-danger btn-sm" onclick="usun_rekord(this)"><i class="fas fa-trash-alt"></i></button> ';
		rekord += '<button id="'+tabela[i].id+'" type="button" class="btn btn-outline-primary btn-sm" onclick="edytuj_rekord(this.id)"><i class="fas fa-edit"></i></button> ';
		rekord += '<button id="'+tabela[i].id+'" type="button" class="btn btn-outline-success btn-sm" onclick="dodaj_koszyk(this.id)"><i class="fas fa-plus"></i></button> </td>';
		rekord += '</tr>';
		
		$.tablesorter.addRows($('#towary')[0].config, rekord, true);
		rekord = '';
	}
}
function load_json()
{
	var obj = JSON.parse(data);
	for(var i=0; i<obj.length; i++)
	{
		var rekord = '<tr>';
		rekord += '<td class="align-middle" id="tdname'+obj[i].id+'">' + obj[i].nazwa + '</td>';
		rekord += '<td class="align-middle" id="tdkod'+obj[i].id+'">' + obj[i].kod + '</td>';
		rekord += '<td class="align-middle" id="tdnetto'+obj[i].id+'">' + Number(obj[i].netto).toFixed(2) + '</td>';
		rekord += '<td class="align-middle" id="tdvat'+obj[i].id+'">' + obj[i].VAT + '</td>';
		rekord += '<td class="align-middle" id="tdbrutto'+obj[i].id+'">' +Number(obj[i].brutto).toFixed(2) + '</td>';
		rekord += '<td class="align-middle" id="tdkategoria'+obj[i].id+'">' + obj[i].kategoria + '</td>';
		rekord += '<td class="align-middle" id="tdopcje'+obj[i].id+'">' + obj[i].opcje + '</td>';
		rekord += '<td class="align-middle" id="tdocena'+obj[i].id+'">' + obj[i].ocena + '</td>';
		if(obj[i].zdj == null)
			rekord += '<td class="align-middle" id="tdzdj'+obj[i].id+'"><img src="img/products/default.jpg" id="imgzdj'+obj[i].id+'" width="100" height="150"></td>'
		else
			rekord += '<td class="align-middle" id="tdzdj'+obj[i].id+'"><img src="'+obj[i].zdj+'" id="imgzdj'+obj[i].id+'" width="100" height="150"></td>';
		rekord += '<td class="text-center align-middle"> <button id="'+obj[i].id+'" type="button" class="btn btn-outline-danger btn-sm" onclick="usun_rekord(this)"><i class="fas fa-trash-alt"></i></button> ';
		rekord += '<button id="'+obj[i].id+'" type="button" class="btn btn-outline-primary btn-sm" onclick="edytuj_rekord(this.id)"><i class="fas fa-edit"></i></button> ';
		rekord += '<button id="'+obj[i].id+'" type="button" class="btn btn-outline-success btn-sm" onclick="dodaj_koszyk(this.id)"><i class="fas fa-plus"></i></button> </td>';
		rekord += '</tr>';
		$.tablesorter.addRows($('#towary')[0].config, rekord, true);
		grid_update();
		elements++;
	}
}
function grid_update()
{
	var text = '<label class="col-md-4 control-label" for="towary"><h1>Produkty</h1></label>';
	text += '<div class = "row d-flex justify-content-center" >';
	for(var i=1; i<=$("#towary tr").length-1; i++)
	{
		text += '<div class="col-lg-3 col-md-4 col-sm-6">\n';
		text += '<div class="thumbnail">\n';
		text += '<a href="#" id='+i+' onClick="dodaj_koszyk(this.id)">\n';

		if($("#imgzdj"+i).attr("src") == null)
			text += '<img width="220" height="325" src=img/products/default.jpg>\n';
		else
		text += '<img width="220" height="325" src='+$("#imgzdj"+i).attr("src")+'>\n';
		text += '<div class="caption"><p>'+$("#tdname"+i).text();
		text += ' ' + Number($("#tdnetto"+i).text()).toFixed(2) + 'zł (' + Number($("#tdbrutto"+i).text()).toFixed(2) + 'zł)\n';
		text += '</p></div>';
		text += '</a>\n';
		text += '</div>\n';
		text += '</div>\n';
	}
	text += '</div>\n';
	$('#gallery_grid').html(text);
}
function gallery()
{
	if($("#gallery_display").val() == "grid")
	{
		var text = '<label class="col-md-4 control-label" for="towary"><h1>Produkty</h1></label>';
		text += '<div class = "row d-flex justify-content-center" >';
		for(var i=1; i<=$("#towary tr").length-1; i++)
		{
			text += '<div class="col-lg-3 col-md-4 col-sm-6">\n';
			text += '<div class="thumbnail">\n';
			text += '<a href="#" id='+i+' onClick="dodaj_koszyk(this.id)">\n';

			if($("#imgzdj"+i).attr("src") == null)
				text += '<img width="220" height="325" src=img/products/default.jpg>\n';
			else
			text += '<img width="220" height="325" src='+$("#imgzdj"+i).attr("src")+'>\n';
			text += '<div class="caption"><p>'+$("#tdname"+i).text();
			text += ' ' + Number($("#tdnetto"+i).text()).toFixed(2) + 'zł (' + Number($("#tdbrutto"+i).text()).toFixed(2) + 'zł)\n';
			text += '</p></div>';
			text += '</a>\n';
			text += '</div>\n';
			text += '</div>\n';
		}
		text += '</div>\n';
		$('#gallery_grid').html(text);
		$('#gallery_grid').attr("hidden", false)
		$('#gallery_list').attr("hidden", true)
	}
	else if($("#gallery_display").val() == "list")
	{
		$('#gallery_list').attr("hidden", false);
		$('#gallery_grid').attr("hidden", true);
	}
}
function sprawdzTowarName()
{
	var formularz_obj = document.getElementById("name");
	var t_name = formularz_obj.value;
	var blad = document.getElementById("name_blad");
	
	var nameRegExp  = /^[a-zA-Z]+$/;
	
	if(!nameRegExp.test(t_name))
	{
		if(t_name==="") blad.innerHTML = "Podaj nazwe towaru"; 
		else blad.innerHTML = "Nieprawidłowy format"; 
		blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
		blad_danych=true;
	}
	else if (t_name.length > 10)
    {
        blad.innerHTML = "Zadluga nazwa (max 10 znakow)"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
	else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
		blad_danych=false;
    } 
	return blad_danych;       
}
function sprawdzKodTowaru()
{
	var code_obj = document.getElementById("code");
	var t_code = code_obj.value;
	var c_blad = document.getElementById("code_blad");
	
	var codeRegExp  = /^[a-zA-Z0-9]{2}-[a-zA-Z0-9]{2}$/;
	
	if(!codeRegExp.test(t_code))
	{
		if(!t_code)c_blad.innerHTML = "Podaj kod towaru";
		else c_blad.innerHTML = "Niewłaściwy format. Kod towaru powinnien mieć formę XX-XX";
		
		c_blad.classList.add("invalid-feedback");
        code_obj.classList.add("is-invalid");
		
        c_blad.classList.remove("valid-feedback");
        code_obj.classList.remove("is-valid");
		var blad_danych=true;
	}
	else
	{
		c_blad.classList.remove("invalid-feedback");
        code_obj.classList.remove("is-invalid");
		
        c_blad.classList.add("valid-feedback");
        code_obj.classList.add("is-valid");
		
        c_blad.innerHTML = ""; 
        var blad_danych=false;
	}
	return blad_danych;
}
function cenaNetto()
{
	var netto_obj = document.getElementById("netto");
	var t_netto = netto_obj.value;
	var n_blad = document.getElementById("netto_blad");
	var netto_ReqExp = /^[0-9]+$/;
	var netto_ReqExp2 = /^[0-9]+.[0-9]{2}$/;
	var netto_ReqExp3 = /^[0-9]+.[0-9]{1}$/;
	var netto_ReqExp4 = /^[0-9]+.$/;

	if(!netto_ReqExp.test(t_netto) && !netto_ReqExp2.test(t_netto) && !netto_ReqExp3.test(t_netto) && !netto_ReqExp4.test(t_netto))
	{
		if(!t_netto)n_blad.innerHTML = "Podaj cenę netto";
		else n_blad.innerHTML = "Niewłaściwy format. Można wpisać tylko liczby";
		
		n_blad.classList.add("invalid-feedback");
        netto_obj.classList.add("is-invalid");
		
        n_blad.classList.remove("valid-feedback");
        netto_obj.classList.remove("is-valid");
		var blad_danych=true;
	}
	else
	{
		if(netto_ReqExp.test(t_netto)) netto_obj.value = t_netto + ".00";
		else if(netto_ReqExp4.test(t_netto)) netto_obj.value = t_netto + "00";
		else if (netto_ReqExp3.test(t_netto)) netto_obj.value = t_netto + "0";
		n_blad.classList.remove("invalid-feedback");
        netto_obj.classList.remove("is-invalid");
		
        n_blad.classList.add("valid-feedback");
        netto_obj.classList.add("is-valid");
		
        n_blad.innerHTML = ""; 
        var blad_danych=false;
	}
	
	obliczenie_brutto();
	return blad_danych;
}
function stawka_VAT()
{
	var vat_obj = document.getElementById("VAT");
	var t_vat = vat_obj.value;
	var v_blad = document.getElementById("VAT_blad");
	
	var vat_ReqExp = /^[0-9]+$/;
	
	if(!vat_ReqExp.test(t_vat))
	{
		if(!t_vat)v_blad.innerHTML = "Podaj stawkę VAT"; 
		else v_blad.innerHTML = "Niewłaściwy format. Można wpisać tylko liczby";
		
		v_blad.classList.add("invalid-feedback");
        vat_obj.classList.add("is-invalid");
		
        v_blad.classList.remove("valid-feedback");
        vat_obj.classList.remove("is-valid");
		var blad_danych=true;
	}
	else
	{
		v_blad.classList.remove("invalid-feedback");
        vat_obj.classList.remove("is-invalid");
		
        v_blad.classList.add("valid-feedback");
        vat_obj.classList.add("is-valid");
		
        v_blad.innerHTML = ""; 
        var blad_danych=false;
	}

	obliczenie_brutto();
	return blad_danych;
}
function obliczenie_brutto()
{
	var netto = document.getElementById("netto").value;
	var vat = document.getElementById("VAT").value;
	
	var netto_ReqExp = /^[0-9]+.[0-9]{2}$/;
	var vat_ReqExp = /^[0-9]+$/;
	
	if(netto_ReqExp.test(netto) && vat_ReqExp.test(vat))
	{
		var cena_netto = Number(document.getElementById("netto").value);
		var stawka = Number(document.getElementById("VAT").value);
	
		//var VAT = (cena_netto * (stawka/100));
		var cena_brutto = cena_netto + (cena_netto * (stawka/100));
		document.getElementById("brutto").value = cena_brutto.toFixed(2);
	}
	else
	{
		document.getElementById("brutto").value = "0.00";
	}
	
	

	//document.getElementById("brutto").value = cena_netto.toFixed(2) + VAT.toFixed(2);
}
function sprawdzKategorie()
{
	var cat_obj = document.getElementById("categories");
	var t_cat = cat_obj.value;
	var blad = document.getElementById("cat_blad");
	
	if(t_cat==0)
	{
		cat_blad.innerHTML = "Należy wybrać kategorię";
		blad.classList.add("invalid-feedback");
        cat_obj.classList.add("is-invalid");
		
        blad.classList.remove("valid-feedback");
        cat_obj.classList.remove("is-valid");
		var blad_danych=true;
	}
	else 
	{
		cat_blad.innerHTML = "";
		blad.classList.remove("invalid-feedback");
        cat_obj.classList.remove("is-invalid");
		
        blad.classList.add("valid-feedback");
        cat_obj.classList.add("is-valid");
		var blad_danych=false;
	}
	return blad_danych;
}
function sprawdzOpcje()
{
	var len = 5;
	var limit = 2;
	var total = 0;
	var id_obj = "options-";
	
	var blad = document.getElementById("opcje_blad");
	for(var i=1; i<=len; i++)
	{
		id_obj = id_obj+i;
		if(document.getElementById(id_obj).checked) 
		{
			total=total+1;
		}
		id_obj=id_obj.substring(0,8);
		
	}
	if(total<limit)
	{
		blad.innerHTML = "Należy wybrać min. 2 opcje ";
		//blad.classList.add("invalid-feedback");
        ////option_obj.classList.add("is-invalid");
		
        //blad.classList.remove("valid-feedback");
        //option_obj.classList.remove("is-valid");
		blad_danych=true;
	}
	else
	{
		blad.innerHTML = "";
		//document.getElementById("opcje_blad").classList.remove("invalid-feedback");
        //option_obj.classList.remove("is-invalid");
		
        //document.getElementById("opcje_blad").classList.add("valid-feedback");
        //option_obj.classList.add("is-valid");
		blad_danych=false;
	}
	
	
	return blad_danych;
}
function liczOpcje()
{
	var len = 5;
	var total = 0;
	var id_option = "options-";
	var opcje = '';
	
	for (var i=1; i<=len; i++)
	{
		id_option = id_option + i;
		if(document.getElementById(id_option).checked) 
		{
			opcje = opcje + document.getElementById(id_option).value + ", ";
		}
		id_option=id_option.substring(0,8);
	}
	opcje = opcje.substring(0, opcje.length - 2);
	return opcje;
}
function sprawdzOcene()
{
	var len = 5;
	var id_rate = "rate-";
	var rate = '';
	
	for (var i=1; i<=len; i++)
	{
		id_rate = id_rate + i;
		if(document.getElementById(id_rate).checked) 
		{
			rate = document.getElementById(id_rate).value;
			break;
		}
		id_rate=id_rate.substring(0,5);
	}
	return rate;
}
function sprawdzZdjecie()
{
	var zdj_obj = document.getElementById("photo");
	var t_zdj = zdj_obj.value;
	var zdj_blad = document.getElementById("photo_blad");
	
	if(!t_zdj)
	{
		zdj_blad.innerHTML = "Wprowadź zdjęcie";
		zdj_blad.classList.add("invalid-feedback");
        zdj_obj.classList.add("is-invalid");
		
        zdj_blad.classList.remove("valid-feedback");
        zdj_obj.classList.remove("is-valid");
		var blad_danych=true;
	}
	else
	{
		zdj_blad.innerHTML = "";
		zdj_blad.classList.remove("invalid-feedback");
        zdj_obj.classList.remove("is-invalid");
		
        zdj_blad.classList.add("valid-feedback");
        zdj_obj.classList.add("is-valid");
		var blad_danych=false;
	}
	return blad_danych;
}
function main_validation()
{
	var nazwa = sprawdzTowarName();
	var kod = sprawdzKodTowaru();
	var netto = cenaNetto();
	var vat = stawka_VAT();
	var kategorie = sprawdzKategorie();
	var opcje = sprawdzOpcje();
	var zdjecie = sprawdzZdjecie();
	
	if(!nazwa && !kod && !netto && !vat && !kategorie && !opcje && !zdjecie)
	{
		document.getElementById("button_check").innerHTML="Prawidłowe dane";
		sprawdzenieTabeli($('#name').val());
		if(!sprawdzenieTabeli($('#name').val())) dodanie_rekordu();
		else alert("Taki rekord już istnieje");
		return true;
	}
	else 
	{
		document.getElementById("button_check").innerHTML="Złe dane";
		return false;
	}
	
}
function sprawdzenieTabeli(nowa_nazwa)
{
	var blad = false;
	for (var i=0; i<elements; i++)
	{
		if(nowa_nazwa == $("#tdname"+i).text())
		{
			blad = true;
		}
	}
	return blad;
}
function dodanie_rekordu()
{
	var tablica = $('#towary')[0];
	
	var nazwa = $("#name").val();
	var kod = $("#code").val();
	var netto = $("#netto").val();
	var vat = $("#VAT").val();
	var brutto = $("#brutto").val();
	var kategoria = $("#categories").val();
	var opcje = '';
	var ocena = sprawdzOcene();
	var zdjecie = $("#photo").val();
	
	//Sprawdzenie opcji
	var id_option = "options-";
	for (var i=1; i<=5; i++)
	{
		id_option = id_option + i;
		if(document.getElementById(id_option).checked) 
		{
			opcje = opcje + document.getElementById(id_option).value + ", ";
		}
		id_option=id_option.substring(0,8);
	}
	opcje = opcje.substring(0, opcje.length - 2);
	
	
	var rekord = '<tr>';
	rekord += '<td id="tdname'+elements+'">' + nazwa + '</td>';
	rekord += '<td id="tdkod'+elements+'">' + kod + '</td>';
	rekord += '<td id="tdnetto'+elements+'">' + netto + '</td>';
	rekord += '<td id="tdvat'+elements+'">' + vat + '</td>';
	rekord += '<td id="tdbrutto'+elements+'">' + brutto + '</td>';
	rekord += '<td id="tdkategoria'+elements+'">' + kategoria + '</td>';
	rekord += '<td id="tdopcje'+elements+'">' + opcje + '</td>';
	rekord += '<td id="tdocena'+elements+'">' + ocena + '</td>';
	rekord += '<td id="tdzdj'+elements+'">' + zdjecie + '</td>';
	rekord += '<td class="text-center"> <button id="'+elements+'" type="button" class="btn btn-outline-danger btn-sm" onclick="usun_rekord(this)"><i class="fas fa-trash-alt"></i></button> ';
	rekord += '<button id="'+elements+'" type="button" class="btn btn-outline-primary btn-sm" onclick="edytuj_rekord(this.id)"><i class="fas fa-edit"></i></button> ';
	rekord += '<button id="'+elements+'" type="button" class="btn btn-outline-success btn-sm" onclick="dodaj_koszyk(this.id)"><i class="fas fa-plus"></i></button> </td>';
	rekord += '</tr>';
	
	$.tablesorter.addRows($('#towary')[0].config, rekord, true);
	grid_update();
	elements=elements + 1;
}
function sortowanie()
{
	var mode = document.getElementById("sorting").value;
	switch (mode)
	{
		case "name_A":
			$("#towary").trigger("sorton", [[[0, 0]]]);
			break;
		case "name_Z":
			$("#towary").trigger("sorton", [[[0, 1]]]);
			break;
		case "price_down":
			$("#towary").trigger("sorton", [[[4, 0]]]);
			break;
		case "price_up":
			$("#towary").trigger("sorton", [[[4, 1]]]);
			break;
		case "rate_down":
			$("#towary").trigger("sorton", [[[7, 0]]]);
			break;
		case "rate_up":
			$("#towary").trigger("sorton", [[[7, 1]]]);
			break;
	}
}
function usun_rekord(r)
{
	alert("Usunięto produkt o nazwie " + $("#tdname"+r.id).text());
	$(r).closest('tr').remove();
	$(".tablesorter").trigger("update");
}
function edytuj_rekord(r_id)
{
	$("#add_button").text("Edytuj");
	$("#add_button").attr("onClick", 'zatwierdzenie_zmian(' + r_id + ')');
	
	var ocena = "rate-" + document.getElementById("tdocena"+r_id).innerHTML;
	$("#name").val($("#tdname"+r_id).html());
	$("#code").val($("#tdkod"+r_id).html());
	$("#netto").val($("#tdnetto"+r_id).html());
	$("#VAT").val($("#tdvat"+r_id).html());
	$("#brutto").val($("#tdbrutto"+r_id).html());
	$("#categories").val($("#tdkategoria"+r_id).html());
	document.getElementById(ocena).checked =  true;
	$("#photo").val($("#tdzdj"+r_id).html());
	
	var opcje = document.getElementById("tdopcje"+r_id).innerHTML.split(", ");
	for (var i=1; i<=5; i++)
		document.getElementById("options-"+i).checked = false;
	
	for(var i=0; i<opcje.length; i++)
	{
		switch(opcje[i])
		{
			case "Nowe": document.getElementById("options-1").checked = true; break;
			case "Używane": document.getElementById("options-2").checked = true; break;
			case "18+": document.getElementById("options-3").checked = true; break;
			case "Seria długa": document.getElementById("options-4").checked = true; break;
			case "Seria krótka": document.getElementById("options-5").checked = true; break;
		}
	}
}
function zatwierdzenie_zmian(id)
{
	for (var i=0; i<tabela.length; i++)
	{
		if(tabela[i].id == id)
		{
			var obj = tabela[i];
			break;
		}
	}
	
	var nazwa = sprawdzTowarName();
	var kod = sprawdzKodTowaru();
	var netto = cenaNetto();
	var vat = stawka_VAT();
	var kategorie = sprawdzKategorie();
	var opcje = sprawdzOpcje();
	var zdjecie = sprawdzZdjecie();
	
	var td_name = "#tdname" + id;
	var td_kod = "#tdkod" + id;
	var td_netto = "#tdnetto" + id;
	var td_vat = "#tdvat" + id;
	var td_brutto = "#tdbrutto" + id;
	var td_kategoria = "#tdkategoria" + id;
	var td_opcje = "#tdopcje" + id;
	var td_ocena = "#tdocena" + id;
	var td_zdj = "#tdzdj" + id;
	
	if(!nazwa && !kod && !netto && !vat && !kategorie && !opcje && !zdjecie)
	{
		var opcje = '';

		//Sprawdzenie opcji
		for (var i=1; i<=5; i++)
		{
			if(document.getElementById("options-"+i).checked) 
			{
				opcje = opcje + document.getElementById("options-"+i).value + ", ";
			}
		}
		opcje = opcje.substring(0, opcje.length - 2);
	
		document.getElementById("button_check").innerHTML="Prawidłowe dane";
		//sprawdzenieTabeli($('#name').val());
		if(!sprawdzenieTabeli($('#name').val()) || $('#name').val() == $())
		{
			$("#towary tbody " + td_name).text($("#name").val());
			$("#towary tbody " + td_kod).text($("#code").val());
			$("#towary tbody " + td_netto).text($("#netto").val());
			$("#towary tbody " + td_vat).text($("#VAT").val());
			$("#towary tbody " + td_brutto).text($("#brutto").val());
			$("#towary tbody " + td_kategoria).text($("#categories").val());
			$("#towary tbody " + td_opcje).text(opcje);
			$("#towary tbody " + td_ocena).text(sprawdzOcene());
			$("#towary tbody " + td_zdj).html($("#photo").val());
			$("#towary").trigger("updateCell");
			alert("Wprowadzono zmiany");
		}
		else alert("Taki rekord już istnieje");
		return true;
	}
	else 
	{
		document.getElementById("button_check").innerHTML="Złe dane";
		return false;
	}
	
}
function dodaj_koszyk(r_id)
{
	var obj = {id:elements, nazwa:$("#tdname"+r_id).text(), kod:$("#tdkod"+r_id).text(), netto:$("#tdnetto"+r_id).text(), VAT:$("#tdvat"+r_id).text(), brutto:$("#tdbrutto"+r_id).text(), kategoria:$("#tdkategoria"+r_id).text(), opcje:$("#tdopcje"+r_id).text(), ocena:$("#tdocena"+r_id).text(), zdj:$("#tdzdj"+r_id).text()};
	var nowy_zakup = "produkt" + storage;
	
	storage++;
	localStorage.setItem(nowy_zakup, JSON.stringify(obj));
	alert("Dodano produkt do koszyka");
}
function pokaz_koszyk()
{
	var index_produktu = "produkt";
	var tabela = document.getElementById("koszyk");
	if(localStorage != 0)
	{
		for(var i=koszyk; i<localStorage.length; i++)
		{
			index_produktu += i;
			var obj = JSON.parse(localStorage.getItem(index_produktu));
			var row = tabela.insertRow(1);
			row.insertCell(0).innerHTML = obj.nazwa;
			row.insertCell(1).innerHTML = obj.brutto;
			row.insertCell(2).innerHTML = '<input id="count_item'+i+'" type="number" value="1" style="width: 40px" onchange="obliczenie_sumy()">';
			index_produktu = index_produktu.substring(0,7);
			koszyk++;
		}
		obliczenie_sumy();
	}
}
function obliczenie_sumy()
{
	var index_produktu = "produkt";
	var suma = 0;
	for(var i=0; i<localStorage.length; i++)
	{
		index_produktu += i;
		var obj = JSON.parse(localStorage.getItem(index_produktu));
		suma += Number(obj.brutto) * $("#count_item"+i).val();
		index_produktu = index_produktu.substring(0,7);
	}
	switch($("#dostawa").val())
	{
		case "poczta": suma += 4.99; break;
		case "kurier": suma += 9.99; break;
	} 
	$("#suma").text(Number(suma).toFixed(2));
}
function zakup()
{
	var tabela = document.getElementById("koszyk");
	for(var i=localStorage.length; i>0; i--)
	{
		tabela.deleteRow(i);
	}
	localStorage.clear();
	koszyk = 0;
	storage = 0;
	alert("Pomyślnie dokonanu zakupu");
}
