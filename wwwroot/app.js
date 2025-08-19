class MMAPredictor {
    constructor() {
        this.fighters = [];
        this.selectedFighters = { fighter1: null, fighter2: null };
        this.apiBase = '/api/fighters';
        
        this.init();
    }

    async init() {
        await this.loadFighters();
        this.setupEventListeners();
    }

    async loadFighters() {
        try {
            const response = await fetch(this.apiBase);
            if (!response.ok) throw new Error('Failed to load fighters');
            this.fighters = await response.json();
        } catch (error) {
            console.error('Error loading fighters:', error);
            // Fallback for development - you can remove this in production
            this.fighters = [];
        }
    }

    setupEventListeners() {
        const fighter1Input = document.getElementById('fighter1');
        const fighter2Input = document.getElementById('fighter2');
        const predictBtn = document.getElementById('predict-btn');

        // Setup autocomplete for both inputs
        this.setupAutocomplete(fighter1Input, 'fighter1');
        this.setupAutocomplete(fighter2Input, 'fighter2');

        // Predict button click
        predictBtn.addEventListener('click', () => this.predictWinner());

        // Hide dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fighter-search')) {
                this.hideAllDropdowns();
            }
        });
    }

    setupAutocomplete(input, fighterKey) {
        const dropdown = document.getElementById(`${fighterKey}-dropdown`);

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 1) {
                this.hideDropdown(dropdown);
                return;
            }

            const matches = this.fighters.filter(fighter => 
                fighter.name.toLowerCase().includes(query) ||
                (fighter.nickName && fighter.nickName.toLowerCase().includes(query))
            ).slice(0, 8); // Limit to 8 results

            this.showDropdown(dropdown, matches, fighterKey);
        });

        input.addEventListener('focus', (e) => {
            if (e.target.value.trim()) {
                const query = e.target.value.toLowerCase().trim();
                const matches = this.fighters.filter(fighter => 
                    fighter.name.toLowerCase().includes(query) ||
                    (fighter.nickName && fighter.nickName.toLowerCase().includes(query))
                ).slice(0, 8);

                if (matches.length > 0) {
                    this.showDropdown(dropdown, matches, fighterKey);
                }
            }
        });
    }

    showDropdown(dropdown, matches, fighterKey) {
        if (matches.length === 0) {
            this.hideDropdown(dropdown);
            return;
        }

        dropdown.innerHTML = matches.map(fighter => `
            <div class="autocomplete-item" data-fighter-id="${fighter.id}">
                <strong>${fighter.name}</strong>
                ${fighter.nickName ? `<span style="color: #666;"> "${fighter.nickName}"</span>` : ''}
                <div style="font-size: 0.9em; color: #888;">
                    ${fighter.wins}W-${fighter.loss}L-${fighter.draws}D
                </div>
            </div>
        `).join('');

        // Add click listeners to dropdown items
        dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                const fighterId = parseInt(item.dataset.fighterId);
                const fighter = this.fighters.find(f => f.id === fighterId);
                this.selectFighter(fighter, fighterKey);
                this.hideDropdown(dropdown);
            });
        });

        dropdown.style.display = 'block';
    }

    hideDropdown(dropdown) {
        dropdown.style.display = 'none';
    }

    hideAllDropdowns() {
        document.querySelectorAll('.autocomplete-dropdown').forEach(dropdown => {
            this.hideDropdown(dropdown);
        });
    }

    selectFighter(fighter, fighterKey) {
        this.selectedFighters[fighterKey] = fighter;
        
        // Update input value
        const input = document.getElementById(fighterKey);
        input.value = fighter.name;

        // Show fighter card
        this.displayFighterCard(fighter, fighterKey);

        // Check if both fighters are selected
        this.updatePredictButton();
    }

    displayFighterCard(fighter, fighterKey) {
        const card = document.getElementById(`${fighterKey}-card`);
        
        const age = fighter.birthday ? this.calculateAge(fighter.birthday) : 'N/A';
        
        card.innerHTML = `
            <div class="fighter-name">${fighter.name}</div>
            ${fighter.nickName ? `<div class="fighter-nickname">"${fighter.nickName}"</div>` : ''}
            <div class="fighter-stats">
                <div class="stat-item">
                    <span class="stat-label">Record:</span>
                    <span class="stat-value">${fighter.wins}W-${fighter.loss}L-${fighter.draws}D</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Age:</span>
                    <span class="stat-value">${age}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Height:</span>
                    <span class="stat-value">${fighter.height ? fighter.height + '"' : 'N/A'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Weight:</span>
                    <span class="stat-value">${fighter.weight ? fighter.weight + ' lbs' : 'N/A'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Reach:</span>
                    <span class="stat-value">${fighter.reach ? fighter.reach + '"' : 'N/A'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Stance:</span>
                    <span class="stat-value">${fighter.stance || 'N/A'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Strike Accuracy:</span>
                    <span class="stat-value">${fighter.significantStrikeAccuracy}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Strike Defense:</span>
                    <span class="stat-value">${fighter.significantStrikeDefense}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Takedown Accuracy:</span>
                    <span class="stat-value">${fighter.takedownAccuracy}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Takedown Defense:</span>
                    <span class="stat-value">${fighter.takedownDefense}%</span>
                </div>
            </div>
        `;

        card.classList.add('show');
    }

    calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    updatePredictButton() {
        const predictBtn = document.getElementById('predict-btn');
        
        if (this.selectedFighters.fighter1 && this.selectedFighters.fighter2) {
            predictBtn.classList.add('active');
        } else {
            predictBtn.classList.remove('active');
        }
    }

    async predictWinner() {
        if (!this.selectedFighters.fighter1 || !this.selectedFighters.fighter2) {
            alert('Please select both fighters first!');
            return;
        }

        const loading = document.getElementById('loading');
        const winnerSection = document.getElementById('winner-section');
        
        // Show loading
        loading.classList.add('show');
        winnerSection.classList.remove('show');

        try {
            const response = await fetch(`${this.apiBase}/PredictByName`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fighter1Name: this.selectedFighters.fighter1.name,
                    fighter2Name: this.selectedFighters.fighter2.name
                })
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const result = await response.json();
            
            // Hide loading and show result
            loading.classList.remove('show');
            this.displayWinner(result.winner);

        } catch (error) {
            console.error('Error predicting winner:', error);
            loading.classList.remove('show');
            alert('Failed to predict winner. Please try again.');
        }
    }

    displayWinner(winnerName) {
        const winnerSection = document.getElementById('winner-section');
        const winnerNameElement = document.getElementById('winner-name');
        
        winnerNameElement.textContent = winnerName;
        winnerSection.classList.add('show');

        // Scroll to winner section
        winnerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MMAPredictor();
});
