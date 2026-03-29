import { Module } from '@nestjs/common';
import { QAModule } from './modules/qa/qa.module';
import { GatewayModule } from './gateway/gateway.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentModule } from './modules/student/student.module';
import { AdmissionModule } from './modules/admission/admission.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ExamModule } from './modules/exam/exam.module';
import { HrModule } from './modules/hr/hr.module';
import { FeeModule } from './modules/fee/fee.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ClassModule } from './modules/class/class.module';
import { SectionModule } from './modules/section/section.module';
import { SubjectModule } from './modules/subject/subject.module';
import { LeaveModule } from './modules/leave/leave.module';
import { NoticeModule } from './modules/notice/notice.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { ScholarshipModule } from './modules/scholarship/scholarship.module';
import { LibraryModule } from './modules/library/library.module';
import { EventModule } from './modules/event/event.module';
import { ActivityModule } from './modules/activity/activity.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { SmsModule } from './modules/sms/sms.module';
import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { BiometricModule } from './modules/biometric/biometric.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { EexamModule } from './modules/eexam/eexam.module';
import { VehicleTrackingModule } from './modules/vehicletracking/vehicletracking.module';
import { BarcodeModule } from './modules/barcode/barcode.module';
import { TeleIntegrationModule } from './modules/teleintegration/teleintegration.module';
import { VirtualClassModule } from './modules/virtualclass/virtualclass.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { UploadModule } from './modules/upload/upload.module';
import { MisModule } from './modules/mis/mis.module';
import { FrontOfficeModule } from './modules/frontoffice/frontoffice.module';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    GatewayModule,
    QAModule,
    AuthModule,
    UsersModule,
    StudentModule,
    AdmissionModule,
    AttendanceModule,
    ExamModule,
    HrModule,
    FeeModule,
    PaymentModule,
    ClassModule,
    SectionModule,
    SubjectModule,
    LeaveModule,
    NoticeModule,
    NotificationModule,
    TimetableModule,
    CertificateModule,
    ScholarshipModule,
    LibraryModule,
    EventModule,
    ActivityModule,
    EmployeeModule,
    PayrollModule,
    SmsModule,
    WhatsAppModule,
    BiometricModule,
    MobileModule,
    EexamModule,
    VehicleTrackingModule,
    BarcodeModule,
    TeleIntegrationModule,
    VirtualClassModule,
    WebhookModule,
    UploadModule,
    MisModule,
    FrontOfficeModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
