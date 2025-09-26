# Local Audio Files

This folder contains local audio files for text-to-speech functionality.

## File Naming Convention

Audio files should be named as: `{text}.wav`

Where `{text}` is the first 50 characters of the text to be spoken, with special characters removed.

## Usage

When audio option is set to "local", the app will try to find audio files in this folder matching the text to be spoken. If not found, it will fallback to browser default text-to-speech.

## Example Files

You can add audio files like:
- `Hello_Im_Navi_your_AI_assistant.wav`
- `Thank_you_for_waiting.wav`
- `What_kind_of_job_are_you_looking_for.wav`

etc.