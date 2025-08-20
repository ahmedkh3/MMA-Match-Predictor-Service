MMA Fans Unite! This is a fun project I created with one goal in mind, bond over big fights. My friends and I are all huge mma fans so I decided to build this application that allows users to see forecasted winners of high stake fights.

# 🥊 MMA Fight Predictor

A full-stack web application that predicts UFC fight outcomes using statistical analysis of fighter data. Compare two fighters and get AI-powered predictions based on their fighting statistics and performance metrics.

## 🚀 Features

- **Comprehensive Fighter Database** - Browse through UFC fighters with detailed statistics
- **Smart Fighter Search** - Autocomplete search with real-time filtering
- **Weight Class Filtering** - Filter fighters by UFC weight divisions
- **Fight Prediction Algorithm** - Compare two fighters and predict the winner
- **Detailed Fighter Cards** - View comprehensive stats including physical attributes and fight records
- **Modern UI** - Responsive design with smooth animations and glassmorphism effects
  
## 🎯 How to Use

1. **Filter by Weight Class** - Select a UFC weight division from the dropdown
<img width="1917" height="787" alt="Screenshot (235)" src="https://github.com/user-attachments/assets/2cb35feb-4571-4140-adce-f6c1fd5e2199" />

<img width="1856" height="561" alt="Screenshot (241)" src="https://github.com/user-attachments/assets/d390bd3e-09a3-4d25-8279-1865c0310af3" />

2. **Search for Fighters** - Use the search boxes to find fighters (autocomplete will help)
<img width="1889" height="862" alt="Screenshot (236)" src="https://github.com/user-attachments/assets/3cae0fd3-3ed3-4d2c-9ae6-0e4cabd792bf" />

3. **Select Two Fighters** - Choose fighters for your matchup prediction
<img width="1789" height="852" alt="Screenshot (237)" src="https://github.com/user-attachments/assets/79ea400e-d2d3-472a-8f53-f4b36bb34535" />
4. **Get Prediction** - Click the prediction button to see who's likely to win
<img width="1627" height="452" alt="Screenshot (238)" src="https://github.com/user-attachments/assets/c3dc3422-1f6a-4df2-93e4-a982fef332b0" />

5. **View Results** - See the predicted winner with detailed comparison
<img width="1866" height="847" alt="Screenshot (239)" src="https://github.com/user-attachments/assets/939da5fa-daf9-40f5-9480-7bdef4677eb3" />

## 🛠️ Tech Stack

### Backend
- **C# .NET 8.0** - Web API framework
- **Entity Framework Core** - Database ORM
- **SQL Server** - Fighter data storage
- **RESTful API** - Clean API endpoints

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

## 📊 How It Works

The prediction algorithm analyzes multiple fighter metrics:

- **Physical Stats**: Height, weight, reach, fighting stance
- **Fight Record**: Wins, losses, draws, win percentage
- **Striking**: Significant strike accuracy and defense percentages
- **Grappling**: Takedown accuracy and defense statistics
- **Performance Analysis**: Historical data comparison

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB works fine)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mma-fight-predictor.git
   cd mma-fight-predictor/MatchPredictor
   ```

2. **Setup the Backend**
   ```bash
   # Restore packages
   dotnet restore

   # Run database migrations
   dotnet ef database update

   # Start the API server
   dotnet run
   ```

3. **Setup the Frontend**
   ```bash
   # Navigate to React app
   cd wwwroot

   # Install dependencies
   npm install

   # Build for production
   npm run build

   # Or run in development mode
   npm run dev
   ```

4. **Access the Application**
   - Main App: `https://localhost:5091`
   - API Endpoints: `https://localhost:7154`
   - API Documentation: `https://localhost:7154/swagger`



## 📁 Project Structure

```
MatchPredictor/
├── Controllers/           # API controllers
│   └── FightersController.cs
├── Data/                 # Database context
│   └── ApplicationDbContext.cs
├── Migrations/           # Database migrations
├── Model/               # Data models
│   ├── Fighter.cs
│   └── PredictionByNameRequest.cs
├── Services/            # Business logic
│   └── PredictionService.cs
├── wwwroot/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service calls
│   │   └── App.jsx     # Main application
│   └── dist/           # Built React app
└── Program.cs          # Application startup
```

## 🔧 Configuration

The app uses SQL Server LocalDB by default. Connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MMAPredictor;Trusted_Connection=true"
  }
}
```

## 🧪 Development

### API Endpoints
- `GET /api/fighters` - Get all fighters
- `GET /api/fighters/{id}` - Get fighter by ID
- `GET /api/fighters/name/{name}` - Get fighter by name
- `POST /api/fighters/predict` - Predict fight winner

### Building for Production
```bash
# Build React app
cd wwwroot
npm run build

# Run .NET in production mode
cd ..
dotnet run --environment Production
```

## 🎨 Features Showcase

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Search** - Instant fighter filtering as you type
- **Smooth Animations** - Framer Motion powered transitions
- **Weight Conversions** - Automatic kg to lbs, cm to ft/in conversions
- **Loading States** - Beautiful loading spinners and states
- **Error Handling** - Graceful error messages and fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

