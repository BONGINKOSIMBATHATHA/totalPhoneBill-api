

document.addEventListener('alpine:init', () => {
    Alpine.data('phoneBillApp', () => ({
        pricePlans: [],
        form: { name: '', call_cost: '', sms_cost: '' },
        errorMessage: '',
        isEditing: false,
        currentPlanId: null,

        async init() {
            await this.loadPricePlans();
        },

        async loadPricePlans() {
            try {
                const response = await axios.get('/api/price_plans/');
                this.pricePlans = response.data;
            } catch (error) {
                console.error('Failed to load price plans', error);
            }
        },

        async submitForm() {
            this.errorMessage = '';
            try {
                if (this.isEditing) {
                    await axios.post('/api/price_plan/update', {
                        name: this.form.name,
                        call_cost: this.form.call_cost,
                        sms_cost: this.form.sms_cost
                    });
                    this.isEditing = false;
                } else {
                    await axios.post('/api/price_plan/create', {
                        name: this.form.name,
                        call_cost: this.form.call_cost,
                        sms_cost: this.form.sms_cost
                    });
                }
                await this.loadPricePlans();
                this.form = { name: '', call_cost: '', sms_cost: '' };
            } catch (error) {
                this.errorMessage = error.response.data.error || 'An error occurred';
            }
        },

        editPlan(plan) {
            this.isEditing = true;
            this.currentPlanId = plan.id;
            this.form = {
                name: plan.plan_name,
                call_cost: plan.call_price,
                sms_cost: plan.sms_price
            };
        },

        async deletePlan(id) {
            this.errorMessage = '';
            try {
                await axios.post('/api/price_plan/delete', { id });
                await this.loadPricePlans();
            } catch (error) {
                this.errorMessage = error.response.data.error || 'An error occurred';
            }
        }
    }));
});


document.getElementById('phoneBillForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const pricePlan = document.getElementById('price_plan').value;
    const actions = document.getElementById('actions').value;

    try {
        const response = await fetch('http://localhost:4011/api/phonebill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price_plan: pricePlan, actions: actions })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('result').innerText = `Total: ${data.total}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Failed to calculate the total phone bill.';
    }
});





