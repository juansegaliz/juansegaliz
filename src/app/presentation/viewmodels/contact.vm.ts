import { Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormData, ContactSubmissionResult } from '../../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactViewModel {
  private readonly fb = new FormBuilder();

  readonly contactForm: FormGroup;
  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly error = signal<string | null>(null);
  readonly result = signal<ContactSubmissionResult | null>(null);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async submit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    try {
      this.submitting.set(true);
      this.error.set(null);

      const formData: ContactFormData = this.contactForm.value;

      // Simulate API call
      await this.simulateSubmit(formData);

      this.result.set({
        success: true,
        message: 'Message sent successfully!',
      });

      this.submitted.set(true);
      this.contactForm.reset();
    } catch (err) {
      this.error.set('Failed to send message. Please try again.');
      this.result.set({
        success: false,
        message: 'Failed to send message.',
      });
      console.error('ContactViewModel submit error:', err);
    } finally {
      this.submitting.set(false);
    }
  }

  private simulateSubmit(data: ContactFormData): Promise<void> {
    console.log('Contact form submitted:', data);
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

  reset(): void {
    this.contactForm.reset();
    this.submitted.set(false);
    this.error.set(null);
    this.result.set(null);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.touched || !field.errors) {
      return null;
    }

    if (field.errors['required']) {
      return 'This field is required';
    }
    if (field.errors['email']) {
      return 'Please enter a valid email';
    }
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }

    return null;
  }
}
