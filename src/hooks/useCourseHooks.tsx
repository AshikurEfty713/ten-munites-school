"use client"
import React, { useEffect, useState } from 'react'

const UseCourseHooks = () => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                console.log(data)
                setCourse(data.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, []);

    return { course, loading, error, setCourse, setLoading, setError };
}

export default UseCourseHooks;
