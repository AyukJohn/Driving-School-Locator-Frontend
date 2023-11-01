// this is for sending async data to the server and receiving same from the server




const form = document.getElementById("searchForm")
const token = localStorage.getItem('userInfo');
const tableBody = document.getElementById("tableBody");

// const locate = document.getElementById("search").value




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


        if (data.locations.length !== 0) {
            console.log(data.locations);


            data.locations.forEach(item => {
                const row = document.createElement("tr");
                
                const nameCell = document.createElement("td");
                nameCell.textContent = item.name;
            
                // Append the location's name to the row
                
                item.driving_schools.forEach(school => {

                    // console.log(school.weburl);
                    
                    const schoolNameCell = document.createElement('td');
                    schoolNameCell.textContent = school.name_of_drivingSchool;
                    
                    const schoolAddressCell = document.createElement('td');
                    schoolAddressCell.textContent = school.address;
                    
                    
                    const schoolWebUrlCell = document.createElement('td');
                    
                    // if (typeof item.webUrl === 'string') {
                        const schoolWebUrl = document.createElement('a');
                        schoolWebUrl.href = school.weburl;
                        schoolWebUrl.textContent = 'Visit Website';
                        schoolWebUrl.target = '_blank'; // Open the link in a new tab

                        schoolWebUrlCell.appendChild(schoolWebUrl);


                        // schoolWebUrlCell.appendChild(schoolWebUrl);
                    // }


                    
                    const schoolPhoneCell = document.createElement('td');
                    schoolPhoneCell.textContent = school.phone;
                    
                    
                    
                    row.appendChild(nameCell);
                    row.appendChild(schoolNameCell);
                    row.appendChild(schoolAddressCell);
                    row.appendChild(schoolPhoneCell);
                    row.appendChild(schoolWebUrlCell);

                });
            
                // Append the row to the table
                tableBody.appendChild(row);
            });
            





        }
        else if (data.locations.length == 0) {
            // console.log(locate);



            alert('no driving school in that location')
            
        }



    })
    .catch(error => {
        console.error('Error:', error);
    });


    search.value = '';

});

