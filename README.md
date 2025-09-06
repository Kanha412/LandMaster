<h1>🏡 LandMaster</h1>

<h2>Introduction</h2>
<p>
  <b>LandMaster</b> is a comprehensive platform designed to streamline real estate management 
  by facilitating the creation, management, and approval of property listings and land requirements. 
</p>
<p>
  By providing an intuitive interface, LandMaster empowers administrators to efficiently post land requirements 
  and enables users to submit detailed property information.
</p>
<p>
  Whether you’re an administrator managing land needs or a user adding property details, 
  LandMaster offers robust tools to facilitate approval processes, track submissions, and manage property information. 
</p>
<p>
  Through fostering collaboration between administrators and users, LandMaster creates an efficient environment 
  where real estate opportunities are effectively managed and fulfilled.
</p>

<hr>

<h2>👥 Users of the System</h2>
<ol>
  <li><b>Admin</b></li>
  <li><b>User</b></li>
</ol>

<hr>

<h2>📸 System Diagrams</h2>

<h3>1. System Architecture Diagram</h3>
<p>
  This diagram represents the overall architecture of the LandMaster project, showing interaction between the 
  <b>Angular client</b>, <b>ASP.NET Core Web API</b>, and the <b>SQL Server database</b>.
</p>
<img width="764" height="326" alt="Screenshot 2025-09-06 235527" src="https://github.com/user-attachments/assets/61435b4d-bfc3-41e8-be23-b2dd632f7ba9" />


<h3>2. Admin Flow Diagram</h3>
<p>
  This diagram represents the workflow for <b>Admin users</b>, including features like managing requirements, 
  properties, and feedbacks.
</p>
<img width="740" height="410" alt="Screenshot 2025-09-06 235619" src="https://github.com/user-attachments/assets/36f79ea9-813b-4c4c-93c5-f936c9b342b4" />


<h3>3. User Flow Diagram</h3>
<p>
  This diagram illustrates the workflow for <b>End Users</b>, such as registering, logging in, creating property details, 
  submitting feedback, and viewing requirements.
</p>
<img width="740" height="410" alt="Screenshot 2025-09-06 235619" src="https://github.com/user-attachments/assets/4c574b6d-ec53-48d9-91cf-af9f0bf8b32e" />

<hr>

<h2>🚀 Tech Stack</h2>
<ul>
  <li><b>Frontend:</b> Angular</li>
  <li><b>Backend:</b> ASP.NET Core Web API</li>
  <li><b>Database:</b> SQL Server</li>
</ul>

<hr>

<h2>📌 Features</h2>
<ul>
  <li>Admin can post and manage land requirements.</li>
  <li>Users can create, edit, and delete property listings.</li>
  <li>Feedback system for improved collaboration.</li>
  <li>Secure authentication and authorization.</li>
  <li>Efficient approval and tracking workflow.</li>
</ul>

<hr>

<h2>🛠️ Setup & Installation</h2>
<ol>
  <li>
    Clone this repository:
    <pre><code class="language-bash">git clone https://github.com/Kanha412/LandMaster.git</code></pre>
  </li>
  <li>
    Navigate to the frontend and install dependencies:
    <pre><code class="language-bash">cd Frontend
npm install
ng serve</code></pre>
  </li>
  <li>
    Navigate to the backend and run the API:
    <pre><code class="language-bash">cd LandMaster
dotnet run</code></pre>
  </li>
  <li>Connect to <b>SQL Server</b> and run migrations.</li>
  <li>Open the app in your browser at <a href="http://localhost:4200" target="_blank">http://localhost:4200</a>.</li>
</ol>
