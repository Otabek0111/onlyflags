const authenticationEndpoint = '/api/existingaccountRoutes';
const createaccountEndpoint = 'api/createaccountRoutes';
const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');
const profileContainer = document.getElementById('profile-container');

let profileId = null; 

function loadProfile(newProfileData) {
    const currentProfile = document.querySelector('.profile');
    const profileNameElement = currentProfile.querySelector('.profile-description');

    profileNameElement.textContent = `${newProfileData.first_name} ${newProfileData.last_name}`;
    profileDescriptionElement.textContent = newProfileData.description;
    profileId = newProfileData.profileId;
}

function removeCurrentProfileFromUI() {
    const currentProfile = document.querySelector('.profile'); // assumes each profile has a 'profile' class
    if (currentProfile) {
        currentProfile.remove();
    }
}

function displayNextProfile(profileData) {
    const nextProfile = document.createElement('div');
    nextProfile.classList.add('profile'); // add profile class to the new profile element

    // populate the profile element with data
    const profileName = document.createElement('h2');
    profileName.textContent = `${profileData.first_name} ${profileData.last_name}`;
    nextProfile.appendChild(profileName);

    profileContainer.appendChild(nextProfile);
}

// wrapping code in function -- to make sure it runs
document.addEventListener('DOMContentLoaded', () => {
    // event listeners for login & registration forms

    const loginForm = document.getElementById('login-form');
    const registrationForm = document.getElementById('registration-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // create a request object

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            };

            try {
                const response = await fetch(authenticationEndpoint, requestOptions);

                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                    const errorData = await response.json();
                    console.error(errorData);
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('registration-username').value;
            const email = document.getElementById('registration-email').value;
            const password = document.getElementById('registration-password').value;
            // add other stuff for registration
            // create a request object

            const requestOptions2 = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            };

            try {
                const response = await fetch(createaccountEndpoint, requestOptions2);

                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                    const errorData = await response.json();
                    console.error(errorData);
                }
            } catch (err) {
                console.error(err);
            }
        });
    }

    if (likeButton) {
        likeButton.addEventListener('click', async () => {
            try {
                // api request to like the current profile
                const likeResponse = await fetch('/api/likes/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ profileId: currentProfileId }), // replace with ID of the current profile
                });

                if (likeResponse.ok) {
                    removeCurrentProfileFromUI();

                    const nextProfileResponse = await fetch('/api/likes/new');
                    if (nextProfileResponse.ok) {
                        const nextProfileData = await nextProfileResponse.json();
                        displayNextProfile(nextProfileData);
                    } else {
                        console.log('No more profiles available');
                    }
                } else {
                    console.error('Like request failed');
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    if (dislikeButton) {
        dislikeButton.addEventListener('click', async () => {
            try {
                // api request to dislike the current profile
                const dislikeResponse = await fetch(`/api/likes/dislike/${profileId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (dislikeResponse.ok) {
                    removeCurrentProfileFromUI();

                    const nextProfileResponse = await fetch('/api/likes/new');
                    if (nextProfileResponse.ok) {
                        const nextProfileData = await nextProfileResponse.json();
                        displayNextProfile(nextProfileData);
                    } else {
                        console.log('No more profiles available');
                    }
                } else {
                    console.error('Dislike request failed');
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
});