// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Phone Bill Management</title>
//     <!-- Materialize CSS -->
//     <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
//     <link rel="stylesheet" href="styles.css"> <!-- Custom CSS (if any) -->
// </head>
// <body>
    
//     <div class="container" x-data="phoneBillApp()" x-init="init()">
//         <!-- Display Price Plans -->
//         <h1 class="center-align">Price Plans</h1>
//         <table class="highlight">
//             <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Call Cost</th>
//                     <th>SMS Cost</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <template x-for="plan in pricePlans" :key="plan.id">
//                     <tr>
//                         <td x-text="plan.id"></td>
//                         <td x-text="plan.plan_name"></td>
//                         <td x-text="plan.call_price"></td>
//                         <td x-text="plan.sms_price"></td>
//                         <td>
//                             <a class="btn waves-effect waves-light" @click="editPlan(plan)">Edit</a>
//                             <a class="btn red waves-effect waves-light" @click="deletePlan(plan.id)">Delete</a>
//                         </td>
//                     </tr>
//                 </template>
//             </tbody>
//         </table>
        
//         <!-- Form to Add/Update Price Plan -->
//         <h2 class="center-align" x-text="isEditing ? 'Edit Price Plan' : 'Add New Price Plan'"></h2>
//         <form @submit.prevent="submitForm()">
//             <div class="input-field">
//                 <input id="name" type="text" x-model="form.name" required>
//                 <label for="name">Name</label>
//             </div>
//             <div class="input-field">
//                 <input id="call_cost" type="number" x-model="form.call_cost" step="0.01" required>
//                 <label for="call_cost">Call Cost</label>
//             </div>
//             <div class="input-field">
//                 <input id="sms_cost" type="number" x-model="form.sms_cost" step="0.01" required>
//                 <label for="sms_cost">SMS Cost</label>
//             </div>
//             <button class="btn waves-effect waves-light" type="submit" x-text="isEditing ? 'Update Plan' : 'Add Plan'"></button>
//             <span class="error red-text" x-text="errorMessage"></span>
//         </form>
//     </div>

//     <div class="container">
//         <h1 class="center-align">Phone Bill Calculator</h1>
//         <form id="phoneBillForm" class="col s12">
//             <div class="input-field">
//                 <label for="price_plan">Price Plan:</label>
//                 <input type="text" id="price_plan" name="price_plan" required>
//             </div>

//             <div class="input-field">
//                 <label for="actions">Actions (comma-separated):</label>
//                 <input type="text" id="actions" name="actions" required>
//             </div>

//             <button class="btn waves-effect waves-light" type="submit" name="action">Calculate Total
//                 <i class="material-icons right">send</i>
//             </button>
//         </form>
//         <div id="result" class="card-panel teal lighten-4"></div>
//     </div>


//     <!-- Materialize JS -->
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.12.0/dist/cdn.min.js" defer></script>
//     <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
//     <script src="alpine.js"></script>
//     <script src="index.js"></script>
// </body>
// </html>
