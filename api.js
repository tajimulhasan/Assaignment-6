





   
    //spinner showing
    const toggleSpinner = displaySpinner => {
        document.getElementById('spinner-div').style.display = displaySpinner;
    }
    const dataNotFound = displayDatanotFound => {
      document.getElementById('not-found').style.display = displayDatanotFound;
    }
    let selectedPhone = null;

const loadData = () => {
     const InputValue = document.getElementById('input-field');
     const InputText = InputValue.value;


     //clear value on input field
    
        if (InputText === '') {
            // Input field is empty, display the "Data not Found" message   
         dataNotFound('block');
            return;
        }
        
    InputValue.value = '';
    toggleSpinner('block');
   

    // bring data form API link
const url = `https://openapi.programming-hero.com/api/phones?search=${InputText}`;
 fetch(url)
.then(ref => ref.json())
.then(data => {
    if (data.data.length === 0) {
        // No data found, display the "Data not Found" message
        dataNotFound('block');
    } else {
        // Data found, hide the "Data not Found" message
        dataNotFound('none');
        displayData(data.data);
    }
    toggleSpinner('none'); // Hide the spinner when data is loaded
}) 

//display data
}

const displayData = phones =>{
    const DataField = document.getElementById('data-field');
    // console.log(phones);
       //clear:
       DataField.textContent = '';
   phones.forEach(phone =>{

       const details = `${phone.slug}`;
       phone.slug = details;
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML =`
        <div class="imagei"><img src="${phone.image}"></div>
       <div class="text-dept">
          <h3>Name: ${phone.phone_name}</h3>
          <h4>Brand: ${phone.brand}</h4>
          <button onclick="loadDetail('${phone.slug}')" type="button" class="btn btn-info">Details</button>
       </div>
       `;
    
       DataField.appendChild(div);
       
   });
toggleSpinner('none');

dataNotFound('none');

}
const loadDetail = (slug) => {
    // Store the selected phone's slug in the global variable
    selectedPhone = slug;

    
    // Define the URL for fetching detailed data for the selected phone
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(ref => ref.json())
    .then(data => displayDetail(data))
    

    const displayDetail = details =>{
       console.log(details);
        const detailsData = document.getElementById('details-field');
        
      //clear:
      detailsData.textContent = '';


        const div = document.createElement('div');
        div.innerHTML = `
        <div class="parent">
            <div class="first-sec">
                <div class="imag"><img src="${details.data.image}"></div>
                <div class="text"><h3>Name: ${details.data.name}</h3>
                <h4>Brand: ${details.data.brand}</h4>
                <p>${details.data.releaseDate}</p></div>
            </div>
 
          <div class="second-sec">
            <h2>Specification</h2>
            <div class="element"><h4>MainFeatures:</h4>
            <p>Chipset: ${details.data.mainFeatures.chipSet}</p>
            <p>Display: ${details.data.mainFeatures.displaySize}</p>
            <p>Memory: ${details.data.mainFeatures.memory}</p>
            <h4>Sensor:</h4>   
            <p>Sensors: ${details.data.mainFeatures.sensors}</p>
            </div>
            
            
            <div class="element"><h4>Other:</h4>   
            <p>Bluetooth: ${details.data.others.Bluetooth}</p>
            <p>GPS: ${details.data.others.GPS}</p>
            <p>NFC: ${details.data.others.NFC}</p>
            <p>USB: ${details.data.others.USB}</p>
            <p>WLAN: ${details.data.others.WLAN}</p>
           
            </div>
       
            
         </div>
        </div>
        `;
        detailsData.appendChild(div);
    }
   
    document.querySelector('#details-field').scrollIntoView({ behavior: 'smooth' });
 }
 
