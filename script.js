document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    
    // Handle image upload
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

    // Gather experience data
    const experiences = Array.from(document.querySelectorAll('.experience')).map(exp => ({
        jobTitle: exp.querySelector('.jobTitle').value,
        company: exp.querySelector('.company').value,
        jobDescription: exp.querySelector('.jobDescription').value
    }));

    // Gather education data
    const educations = Array.from(document.querySelectorAll('.education')).map(edu => ({
        degree: edu.querySelector('.degree').value,
        institution: edu.querySelector('.institution').value,
        educationDescription: edu.querySelector('.educationDescription').value
    }));

    // Generate resume output
    const resumeOutput = document.getElementById('resumeOutput');
    resumeOutput.innerHTML = `
        <h2>${name}'s Resume</h2>
        ${imageUrl ? `<img src="${imageUrl}" alt="Profile Image" style="width:150px;height:auto;"/>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Summary</h3>
        <p>${summary}</p>
        <h3>Skills</h3>
        <p>${skills.join(', ')}</p>
        <h3>Experience</h3>
        ${experiences.map(exp => `
            <div>
                <strong>${exp.jobTitle}</strong> at ${exp.company}
                <p>${exp.jobDescription}</p>
            </div>
        `).join('')}
        <h3>Education</h3>
        ${educations.map(edu => `
            <div>
                <strong>${edu.degree}</strong> from ${edu.institution}
                <p>${edu.educationDescription}</p>
            </div>
        `).join('')}
    `;
    resumeOutput.classList.remove('hidden');
});

// Function to add experience fields
document.getElementById('addExperience').addEventListener('click', function() {
    const experienceContainer = document.getElementById('experienceContainer');
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add('experience');
    experienceDiv.innerHTML = `
        <input type="text" placeholder="Job Title" class="jobTitle" required>
        <input type="text" placeholder="Company" class="company" required>
        <textarea placeholder="Job Description" class="jobDescription" required></textarea>
        <button type="button" class="removeExperience">Remove</button>
    `;
    experienceContainer.appendChild(experienceDiv);
});

// Function to add education fields
document.getElementById('addEducation').addEventListener('click', function() {
    const educationContainer = document.getElementById('educationContainer');
    const educationDiv = document.createElement('div');
    educationDiv.classList.add('education');
    educationDiv.innerHTML = `
        <input type="text" placeholder="Degree" class="degree" required>
        <input type="text" placeholder="Institution" class="institution" required>
        <textarea placeholder="Description" class="educationDescription" required></textarea>
        <button type="button" class="removeEducation">Remove</button>
    `;
    educationContainer.appendChild(educationDiv);
});

// Event delegation to remove experience or education fields
document.getElementById('experienceContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('removeExperience')) {
        event.target.parentElement.remove();
    }
});

document.getElementById('educationContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('removeEducation')) {
        event.target.parentElement.remove();
    }
});