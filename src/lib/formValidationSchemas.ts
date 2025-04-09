import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(), // Optional for create, (required for update)
    //coerce.number() is used to convert the string to a number, if it is not a number, it will be NaN and the validation will fail.
    name: z
        .string()
        .min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()) //teacher ids will be added

});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
    id: z.coerce.number().optional(), // Optional for create, (required for update)
    //coerce.number() is used to convert the string to a number, if it is not a number, it will be NaN and the validation will fail.
    name: z
        .string()
        .min(1, { message: "Subject name is required!" }),
    capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
    gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
    supervisorId: z.coerce.string().optional(), // Optional for create, (required for update)

});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z
        .string()
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    phone: z.string().optional(),
    address: z.string().min(1, { message: "Address is required!" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }), //whenevr , date (or number or boolean) is used, it will be converted to date object, if it is not a date, it will be NaN and the validation will fail.
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    img: z.string().optional(),    //returns image url
    subjects: z.array(z.string()).optional(), // stores subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
    id: z.string().optional(),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" })
        .max(20, { message: "Username must be at most 20 characters long!" }),
    email: z
        .string()
        .email({ message: "Invalid email address!" })
        .optional()
        .or(z.literal("")),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
    name: z.string().min(1, { message: "First name is required!" }),
    surname: z.string().min(1, { message: "Last name is required!" }),
    phone: z.string().optional(),
    address: z.string().min(1, { message: "Address is required!" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }), //whenevr , date (or number or boolean) is used, it will be converted to date object, if it is not a date, it will be NaN and the validation will fail.
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    img: z.string().optional(),    //returns image url
    gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
    classId: z.coerce.number().min(1, { message: "Class name is required!" }),
    parentId: z.string().min(1, { message: "Parent id is required!" })
})
export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
    id: z.coerce.number().optional(), // Optional for create, (required for update)
    //coerce.number() is used to convert the string to a number, if it is not a number, it will be NaN and the validation will fail.
    title: z
        .string()
        .min(1, { message: "Title is required!" }),
    startTime: z.coerce.date({ message: "Start time is required!" }),
    endTime: z.coerce.date({ message: "End time is required!" }),
    lessonId: z.coerce.number().min(1, { message: "Lesson id is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;