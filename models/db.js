//#region createIndexDB
var baseName  = 'my_db';
var storeName = 'phone';

function connectDB(f){
	// Open (or create) the database
	var request = indexedDB.open(baseName, 1);
	request.onerror = function(e){
        console.log(e);
    }
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		var Db = e.currentTarget.result;
		
		//Create store
		if(!Db.objectStoreNames.contains(storeName)) {
			Db.createObjectStore(storeName, {keyPath: "id", autoIncrement:true});  
			//store.createIndex("NameIndex", ["name.last", "name.first"], { unique: false });
		}
		connectDB(f);
	}
}
//#endregion createIndexDB

function create(data, cb) {
    //console.log("db data",data);
    connectDB(function(db){
	
        var request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .add({ name: data.name, rollNo : data.rollNo, address : data.address });
        
        request.onsuccess = function(event) {
           cb(null, "Successfully saved!");
        };
        
        request.onerror = function(event) {
           cb('Something wrong!', null);
        }

    });
}

function readAll(cb) {
    connectDB(function(db){
        var rows = [],
			store = db.transaction([storeName], "readonly")
            .objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				cb(e.target.result, null);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					cb(null, rows);
				}
			};
    });
}

function deleteTask(id, cb){
    connectDB((db)=>{
        var request = db.transaction([storeName], "readwrite")
        .objectStore(storeName)
        .delete(id);
        
        request.onsuccess = function(event) {
           cb(null, 'Deleted!');
        };
    });
    
}

function update(data, userId, cb){
	var id = Number(userId)
	connectDB((db)=> {
		var rows = [];
		var objectStore = db.transaction([storeName], "readwrite")
		.objectStore(storeName)

		var request = objectStore.get(id);
			request.onsuccess = function (event){
				
				var student = request.result;
				console.log(student);
				console.log(data);
				student.name = data.name;
				student.rollNo = data.rollNo;
				student.address = data.address;

				 var updateData = objectStore.put(student);
				 updateData.onsuccess = () => {
						cb(null, 'Updated task');
					}
			}
		
	});
}

