// this is for sending async data to the server and receiving same from the server




const form = document.getElementById("searchForm")
const token = localStorage.getItem('userInfo');
const tableBody = document.getElementById("tableBody");



form.addEventListener("submit",(e) => {
    e.preventDefault();


    const data = {
        query: search.value,
    };

    // Send a POST request to the external API (replace 'api_url' with the actual API URL)
    fetch('https://stagingap.fintabng.com/api/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);

        tableBody.innerHTML = "";


        if (data.drivingSchools.length !== 0) {
            console.log('driving is empty');


            data.drivingSchools.forEach(item => {
                const row = document.createElement("tr");
            
                const schoolLocationCell = document.createElement('td');
                schoolLocationCell.textContent = item.location.name; // Access the 'name' property within 'location'
            
                const schoolNameCell = document.createElement('td');
                schoolNameCell.textContent = item.name_of_drivingSchool;
            
                const schoolAddressCell = document.createElement('td');
                schoolAddressCell.textContent = item.address;
            
                row.appendChild(schoolLocationCell); // Append the location name cell
                row.appendChild(schoolNameCell);
                row.appendChild(schoolAddressCell);
            
                tableBody.appendChild(row);
            });
            





        }else if (data.locations.length !== 0) {
            console.log('location is empty');


            data.locations.forEach(item => {
                const row = document.createElement("tr");
                
                const nameCell = document.createElement("td");
                nameCell.textContent = item.name;
            
                // Append the location's name to the row
                row.appendChild(nameCell);
            
                item.driving_schools.forEach(school => {
                    
                    const schoolNameCell = document.createElement('td');
                    schoolNameCell.textContent = school.name_of_drivingSchool;
            
                    const schoolAddressCell = document.createElement('td');
                    schoolAddressCell.textContent = school.address;
            
                   
                    row.appendChild(schoolNameCell);
                    row.appendChild(schoolAddressCell);
                });
            
                // Append the row to the table
                tableBody.appendChild(row);
            });
            

            
            
        }



    })
    .catch(error => {
        console.error('Error:', error);
    });


    search.value = '';

});

